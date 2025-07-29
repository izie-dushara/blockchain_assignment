import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from '@safe-global/protocol-kit';
import { createPublicClient, http, isAddress } from 'viem';
// import { Client, createPublicClient } from 'viem';
import { sepolia } from 'viem/chains';
import { CreateSafeWalletDto } from './dto/create-safe-wallet.dto';
// import { CreateSafeWalletDto } from './dto/create-safe-wallet.dto';
// import { UpdateSafeWalletDto } from './dto/update-safe-wallet.dto';

@Injectable()
export class SafeWalletService {
  private readonly logger = new Logger(SafeWalletService.name);

  private readonly publicClient = createPublicClient({
    chain: sepolia,
    transport: http(
      'https://sepolia.infura.io/v3/e8aeb14129564ce393447f5d248f3dfa',
    ),
  });

  async createSafeWallet(createSafeDto: CreateSafeWalletDto) {
    try {
      const safeAccountConfig: SafeAccountConfig = {
        owners: createSafeDto.owners,
        threshold: createSafeDto.threshold,
      };

      const predictedSafe: PredictedSafeProps = {
        safeAccountConfig,
      };

      const protocolKit = await Safe.init({
        provider: sepolia.rpcUrls.default.http[0],
        signer: createSafeDto.signerPrivateKey,
        predictedSafe,
      });

      const safeAddress = await protocolKit.getAddress();
      this.logger.log(`Predicted Safe Address: ${safeAddress}`);

      const isAlreadyDeployed = await protocolKit.isSafeDeployed();
      if (isAlreadyDeployed) {
        throw new BadRequestException(
          'Safe wallet already deployed at this address',
        );
      }

      const deploymentTransaction =
        await protocolKit.createSafeDeploymentTransaction();
      const client = await protocolKit.getSafeProvider().getExternalSigner();

      const transactionHash = await client!.sendTransaction({
        to: deploymentTransaction.to,
        value: BigInt(deploymentTransaction.value),
        data: deploymentTransaction.data as `0x${string}`,
        chain: sepolia,
      });
      const transactionReceipt =
        await this.publicClient.waitForTransactionReceipt({
          hash: transactionHash,
        });

      const newProtocolKit = await protocolKit.connect({
        safeAddress,
      });

      const deploymentResult = await this.getSafeDetails(newProtocolKit);

      return {
        transactionHash,
        receipt: transactionReceipt,
        safe: deploymentResult,
      };
    } catch (error) {
      this.logger.error('Failed to create Safe wallet', error);
      throw error;
    }
  }

  async getSafeWallet(safeAddress: string) {
    try {
      if (!isAddress(safeAddress)) {
        throw new BadRequestException('Invalid Safe address format');
      }

      const protocolKit = await Safe.init({
        provider: sepolia.rpcUrls.default.http[0],
        safeAddress,
      });

      const isDeployed = await protocolKit.isSafeDeployed();
      if (!isDeployed) {
        throw new NotFoundException('Safe wallet not found or not deployed');
      }

      return await this.getSafeDetails(protocolKit);
    } catch (error) {
      this.logger.error(
        `Failed to get Safe wallet details for ${safeAddress}`,
        error,
      );
      throw error;
    }
  }

  private async getSafeDetails(protocolKit: Safe) {
    const [isDeployed, address, owners, threshold] = await Promise.all([
      protocolKit.isSafeDeployed(),
      protocolKit.getAddress(),
      protocolKit.getOwners(),
      protocolKit.getThreshold(),
    ]);

    return {
      isDeployed,
      address,
      owners,
      threshold,
      ownnersCount: owners.length,
    };
  }

  //   TODO: Find a way to get safes of an owner
  //   getSafesForOwner(ownerAddress: string) {
  //     try {
  //       if (!isAddress(ownerAddress)) {
  //         throw new BadRequestException('Invalid owner address format');
  //       }
  //       const safes = await `https://safe-transaction-sepolia.safe.global/api/v1/owners/${ownerAddress}/safes/`;
  //       return safes;
  //     } catch (error) {
  //       this.logger.error(`Failed to get Safes for owner ${ownerAddress}`, error);
  //       throw error;
  //     }
  //   }

  async isSafeDeployed(safeAddress: string): Promise<boolean> {
    try {
      if (!isAddress(safeAddress)) {
        throw new BadRequestException('Invalid Safe address format.');
      }

      const protocolKit = await Safe.init({
        provider: sepolia.rpcUrls.default.http[0],
        safeAddress,
      });

      return await protocolKit.isSafeDeployed();
    } catch (error) {
      this.logger.error(
        `Failed to check if Safe is deployed at ${safeAddress}`,
        error,
      );
      return false;
    }
  }
  // TODO: Implement if I have some sort of usage for this
  //   async predictSafeAddress(owners: string[], threshold: number, saltNonce?: string,);
  async getSafeBalance(safeAddress: string) {
    try {
      if (!isAddress(safeAddress)) {
        throw new BadRequestException('Invalid Safe address format');
      }
      const balance = await this.publicClient.getBalance({
        address: safeAddress as `0x${string}`,
      });

      return {
        address: safeAddress,
        balance: balance.toString(),
        balanceInEth: (Number(balance) / 1e18).toString(),
      };
    } catch (error) {
      this.logger.error(`Failed to get balance for Safe ${safeAddress}`, error);
      throw error;
    }
  }
}
