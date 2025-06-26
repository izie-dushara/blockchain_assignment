import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: Define resources
// TODO: Create multi-signature wallet contract

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('apitest/');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
});
