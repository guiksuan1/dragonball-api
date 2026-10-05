import { Router } from 'express';
import { PersonagemController } from '../controllers/PersonagemController';

const router = Router();

/**
 * @swagger
 * /api/personagens:
 *   get:
 *     summary: Lista todos os personagens
 *     tags: [Personagens]
 *     responses:
 *       200:
 *         description: Sucesso
 *   post:
 *     summary: Cadastra um novo personagem
 *     tags: [Personagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Goku"
 *               raca:
 *                 type: string
 *                 example: "Saiyajin"
 *               poderDeLuta:
 *                 type: integer
 *                 example: 8000
 *               planetaOrigem:
 *                 type: string
 *                 example: "Planeta Vegeta"
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *       400:
 *         description: Campos inválidos
 * 
 * /api/personagens/{id}:
 *   get:
 *     summary: Busca um personagem por ID
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Personagem não encontrado
 *   put:
 *     summary: Atualiza um personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               poderDeLuta:
 *                 type: integer
 *                 example: 9001
 *     responses:
 *       200:
 *         description: Sucesso
 *   delete:
 *     summary: Remove um personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Excluído com sucesso
 */

router.get('/', PersonagemController.index);
router.get('/:id', PersonagemController.show);
router.post('/', PersonagemController.create);
router.put('/:id', PersonagemController.update);
router.delete('/:id', PersonagemController.delete);

export { router as personagemRoutes };