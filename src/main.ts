import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ 
      // allow only expected properties in the request body and remove the rest
      whitelist: true 
    }),
  );
  await app.listen(3000);
}
bootstrap();
