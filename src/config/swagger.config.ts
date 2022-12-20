import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from './../../package.json';

export const initializeSwagger = (app: any) => {
  const config = new DocumentBuilder()
    .setTitle('Stralom Financial')
    .setDescription('Documentação da API do Stralom Financial')
    .setVersion(version)
    .addBearerAuth()
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
