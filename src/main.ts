import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigService);
  if (configurationService.get('ENVINRONMENT') !== 'local') {
    app.enableCors({
      origin: [/.*\.stralom\.com$/],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    });
  } else {
    app.enableCors();
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api/financial');
  initializeSwagger(app);
  await app.listen(3001);
}
bootstrap();
