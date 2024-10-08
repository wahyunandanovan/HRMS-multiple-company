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
import { limiter } from './helper/limiter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 8080;

  app.enableCors({
    origin: ['http://localhost:3000', 'https://piawai.id'],
    credentials: true,
  });

  app.use(express.json());
  app.setGlobalPrefix(`/api/${apiVersion}/`);
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.use(limiter);
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

  SwaggerModule.setup('/', app, document);

  await app.listen(port);
}
bootstrap();
