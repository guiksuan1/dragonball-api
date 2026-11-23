import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dragon Ball API',
      version: '1.0.0',
      description: 'API RESTful de Personagens do Universo Dragon Ball',
    },
    servers: [{ url: '/' }],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './dist/routes/*.js',
    './dist/controllers/*.js',
  ], // Caminho para encontrar as anotações em dev e produção
};

export const swaggerSpec = swaggerJSDoc(options);