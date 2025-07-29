import { Module } from '@nestjs/common';
import { SafesService } from './safes.service';
import { SafesController } from './safes.controller';

@Module({
  controllers: [SafesController],
  providers: [SafesService],
})
export class SafesModule {}
