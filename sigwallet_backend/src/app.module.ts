import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { SafeWalletModule } from './safe-wallet/safe-wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    SafeWalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
