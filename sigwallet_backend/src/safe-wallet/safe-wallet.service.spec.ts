// import Safe from '@safe-global/protocol-kit';
// import { SafeWalletService } from './safe-wallet.service';

// // const service = new SafeWalletService();

// // // async function main() {
// // //   //   const result = await service.createSafeWallet();
// // //   await service.getCreatedSafe();
// // // }
// // //   /**
// // //    * CREATE A NEW SAFE WALLET
// // //    * This deploys a new Safe smart contract on the blockchain
// // //    */
// // //   async createSafeWallet() {
// // //     try {
// // //       const safeAccountConfig: SafeAccountConfig = {
// // //         owners: [
// // //           '0x8D8Cd316b309Db36CE5Ee4B240183A13a40CdF32',
// // //           '0x858d9fA094Eb105fFf746Cb63b294b378DA96adB',
// // //         ],
// // //         threshold: 2,
// // //       };

// // //       const predictedSafe: PredictedSafeProps = {
// // //         safeAccountConfig,
// // //       };

// // //       const protocolKit = await Safe.init({
// // //         provider: sepolia.rpcUrls.default.http[0],
// // //         signer:
// // //           '7af0c58a39e3c07e321f082314ad634f4d4ad7e98f2f93481c23abd0f2f7dcbf',
// // //         predictedSafe,
// // //       });

// // //       const safeAddress = await protocolKit.getAddress();

// // //       const deploymentTransaction =
// // //         await protocolKit.createSafeDeploymentTransaction();

// // //       const client = await protocolKit.getSafeProvider().getExternalSigner();
// // //       const transactionHash = await client!.sendTransaction({
// // //         to: deploymentTransaction.to,
// // //         value: BigInt(deploymentTransaction.value),
// // //         data: deploymentTransaction.data as `0x${string}`,
// // //         chain: sepolia,
// // //       });

// // //       const publicClient = createPublicClient({
// // //         chain: sepolia,
// // //         transport: http(
// // //           'https://sepolia.infura.io/v3/e8aeb14129564ce393447f5d248f3dfa',
// // //         ),
// // //       });

// // //       const transactionReceipt = await publicClient.waitForTransactionReceipt({
// // //         hash: transactionHash,
// // //       });

// // //       const newProtocolKit = await protocolKit.connect({
// // //         safeAddress,
// // //       });

// // //       const isSafeDeployed = await newProtocolKit.isSafeDeployed();
// // //       const safeWalletAddress = await newProtocolKit.getAddress();
// // //       const safeOwners = await newProtocolKit.getOwners();
// // //       const safeThreshold = await newProtocolKit.getThreshold();

// // //       return {
// // //         receipt: transactionReceipt,
// // //         isDeployed: isSafeDeployed,
// // //         address: safeWalletAddress,
// // //         owners: safeOwners,
// // //         threshold: safeThreshold,
// // //       };
// // //     } catch (error) {
// // //       this.logger.error('Failed to create Safe wallet', error);
// // //       throw error;
// // //     }
// // //   }

// // //   async getCreatedSafe() {
// // //     const safeAddress = '0xB70657d13037Ee212DB3Bba82047784e1908CF35';
// // //     const protocolKit = await Safe.init({
// // //       provider: sepolia.rpcUrls.default.http[0], // or use your own Infura/Alchemy
// // //       signer: safeAddress, // or a signer object
// // //       safeAddress, // just this instead of predictedSafe
// // //     });

// // //     // Get Safe details
// // //     const isDeployed = await protocolKit.isSafeDeployed();
// // //     const owners = await protocolKit.getOwners();
// // //     const threshold = await protocolKit.getThreshold();
// // //     const address = await protocolKit.getAddress();

// // //     console.log('✅ Safe Address:', address);
// // //     console.log('📌 Is Deployed:', isDeployed);
// // //     console.log('👥 Owners:', owners);
// // //     console.log('🔐 Threshold:', threshold);
// // //   }
// // // main().catch((e) => {
// // //   console.error(e);
// // // });
