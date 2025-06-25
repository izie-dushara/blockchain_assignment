import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: Set Hardhat
// TODO: Set Kysely

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('apitest/');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
});
