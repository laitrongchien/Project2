import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformIdInterceptor } from './interceptors/transform-id.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('IT Asset Management System')
    .setDescription('API for ITAMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new TransformIdInterceptor());
  await app.listen(process.env.PORT || 8000);
  // console.log(process.env.JWT_ACCESS_TOKEN_SECRET);
}
bootstrap();
