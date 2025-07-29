import { Module } from '@nestjs/common';
import { SafeWalletService } from './safe-wallet.service';
import { SafeWalletController } from './safe-wallet.controller';

@Module({
  controllers: [SafeWalletController],
  providers: [SafeWalletService],
})
export class SafeWalletModule {}
