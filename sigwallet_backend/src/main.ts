import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// TODO: Define resources
// TODO: Create multi-signature wallet contract

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('apitest/');
  const config = new DocumentBuilder()
    .setTitle('Multisig Wallet API')
    .setDescription('API for managing multisig wallets')
    .setVersion('1.0')
    .addTag('Powered by Safe: https://safe.global/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
});
