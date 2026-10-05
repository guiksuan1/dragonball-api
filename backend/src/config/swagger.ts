import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dragon Ball API',
      version: '1.0.0',
      description: 'API RESTful de Personagens do Universo Dragon Ball',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Caminho para encontrar as anotações
};

export const swaggerSpec = swaggerJSDoc(options);