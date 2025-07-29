import { Test, TestingModule } from '@nestjs/testing';
import { SafeWalletController } from './safe-wallet.controller';
import { SafeWalletService } from './safe-wallet.service';

describe('SafeWalletController', () => {
  let controller: SafeWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafeWalletController],
      providers: [SafeWalletService],
    }).compile();

    controller = module.get<SafeWalletController>(SafeWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
