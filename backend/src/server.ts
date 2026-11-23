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
  res.status(200).json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    mensagem: 'Servidor Dragon Ball operante!',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/personagens', personagemRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados Dragon Ball estabelecida com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Health Check disponível em /api/health`);
      console.log(`Documentação Swagger disponível em /api-docs`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

main();