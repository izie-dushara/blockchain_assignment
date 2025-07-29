import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SafeWalletModule } from './safe-wallet/safe-wallet.module';
import { SafesModule } from './safes/safes.module';
import { WalletsModule } from './wallets/wallets.module';
import { OwnerModule } from './owner/owner.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    SafeWalletModule,
    SafesModule,
    WalletsModule,
    OwnerModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
