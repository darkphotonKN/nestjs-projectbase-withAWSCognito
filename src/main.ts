import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

// for rendering html
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // allows nestjs to strip all properties sent in a request
  // that was now allowed via decorators
  app.enableCors();
  // cookie session set-up
  app.use(
    cookieSession({
      keys: ['test'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // for security
    }),
  );
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(process.env.PORT);
}

bootstrap();
