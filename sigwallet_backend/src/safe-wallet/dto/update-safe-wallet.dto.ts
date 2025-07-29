import { PartialType } from '@nestjs/mapped-types';
import { CreateSafeWalletDto } from './create-safe-wallet.dto';

export class UpdateSafeWalletDto extends PartialType(CreateSafeWalletDto) {}
