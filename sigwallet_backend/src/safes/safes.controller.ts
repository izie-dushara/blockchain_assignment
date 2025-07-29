import { Controller } from '@nestjs/common';
import { SafesService } from './safes.service';

@Controller('safes')
export class SafesController {
  constructor(private readonly safesService: SafesService) {}
}
