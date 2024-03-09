import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { join } from 'path';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { apiVersion } from './constant/apiVersion';
import { appConstant } from './constant/appConstant';

async function bootstrap() {
  console.log({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 8080;

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.use(express.json());
  app.setGlobalPrefix(`/api/${apiVersion}/`);
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('class-transformer'),
      transform: true,
      forbidUnknownValues: false,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(`DOKUMENTASI API ${appConstant.name.toUpperCase()}`)
    .setDescription(`Base url: /api/${apiVersion}`)
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}
bootstrap();
