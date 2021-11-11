import { join, resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('<Bootstrap>');
  const app = await NestFactory.create(AppModule);
  logger.log(process.version, 'NodeJS version');

  logger.log(resolve('../../frontend/dist'));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  /*
  const fs = require('fs');
  const testFolder = './src/entity';

  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
      const name = testFolder + '/' + file;
      if (!fs.statSync(name).isDirectory()) {
        logger.log(file, 'file');
      }
    });

    if (err) logger.error(err);
  });
  */

  app.setGlobalPrefix('api');

  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
