import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const file = readFileSync(join('.', 'doc', 'api.yaml'), 'utf-8');
  const document = parse(file);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(4000);
}
bootstrap();
