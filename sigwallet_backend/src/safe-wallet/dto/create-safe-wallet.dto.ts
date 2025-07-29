import { ApiProperty } from '@nestjs/swagger';

export class CreateSafeWalletDto {
  @ApiProperty({
    description: 'Array of owner addresses for the Safe wallet',
    example: [
      '0x8D8Cd316b309Db36CE5Ee4B240183A13a40CdF32',
      '0x858d9fA094Eb105fFf746Cb63b294b378DA96adB',
    ],
    type: [String],
  })
  owners: [string];

  @ApiProperty({
    description:
      'Number of required signatures for transactions (must be <= number of owners)',
    example: 2,
    minimum: 1,
  })
  threshold: number;

  @ApiProperty({
    description:
      'Private key of the signer for deployment (64 characters hex without 0x)',
    example: '7af0c58a39e3c07e321f082314ad634f4d4ad7e98f2f93481c23abd0f2f7dcbf',
    minLength: 64,
    maxLength: 64,
  })
  signerPrivateKey: string;
  @ApiProperty({
    description: 'Optional salt nonce for deterministic address generation',
    example: '12345',
    required: false,
  })
  saltNonce?: string;
}
