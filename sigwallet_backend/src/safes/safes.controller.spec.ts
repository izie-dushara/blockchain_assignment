import { Test, TestingModule } from '@nestjs/testing';
import { SafesController } from './safes.controller';
import { SafesService } from './safes.service';

describe('SafesController', () => {
  let controller: SafesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafesController],
      providers: [SafesService],
    }).compile();

    controller = module.get<SafesController>(SafesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
