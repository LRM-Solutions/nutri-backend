// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitTrack API',
      version: '1.0.0',
      description: 'Documentação da API do FitTrack',
    },
    servers: [
      {
        url: 'http://localhost:3334',
      },
    ],
  },
  apis: ['./docs/*.js'], // ajuste o caminho conforme sua estrutura
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
