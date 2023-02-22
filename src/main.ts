import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

// for rendering html
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
      whitelist: true, // any property not included in the whitelist will be stripped from the request
      forbidNonWhitelisted: true, // if true, will throw an error if a property is not included in the whitelist
      transform: true, // will transform the request body to the type specified in the DTO
      transformOptions: {
        enableImplicitConversion: true, // will convert string to number if the type is number
      },
    }),
  );

  // Setting up Swagger document 
  const options = new DocumentBuilder()
    .setTitle('cm-portal-docs')
    .setDescription('a documentation for all the apis related to cooler master portal BE application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(process.env.PORT);
}

bootstrap();
