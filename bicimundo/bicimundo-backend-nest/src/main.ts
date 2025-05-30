import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: [
      'Content-Type',
      'Authorization',                     
      'Accept',
      'Origin',
      'X-Requested-With'
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
