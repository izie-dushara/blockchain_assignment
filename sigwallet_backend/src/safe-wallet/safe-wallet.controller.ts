import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSafeWalletDto } from './dto/create-safe-wallet.dto';
import { SafeWalletService } from './safe-wallet.service';

@ApiTags('Safe Wallets')
@Controller('safe-wallet')
export class SafeWalletController {
  constructor(private readonly safeWalletService: SafeWalletService) {}

  @Post()
  async createSafeWallet(@Body() createSafeDto: CreateSafeWalletDto) {
    return this.safeWalletService.createSafeWallet(createSafeDto);
  }

  @Get(':address')
  async getSafeWallet(@Param('address') address: string) {
    return this.safeWalletService.getSafeWallet(address);
  }

  @Get(':address/balance')
  async getSafeBlance(@Param('address') address: string) {
    return this.safeWalletService.getSafeBalance(address);
  }

  @Get(':address/is-deployed')
  async isSafeDeployed(@Param('address') address: string) {
    const isDeployed = await this.safeWalletService.isSafeDeployed(address);
    return { address, isDeployed };
  }
}
