import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { sequelize } from './config/database';
import { personagemRoutes } from './routes/personagemRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota da Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', mensagem: 'Servidor Dragon Ball operante!' });
});

app.use('/api/personagens', personagemRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados Dragon Ball estabelecida com sucesso.');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

main();