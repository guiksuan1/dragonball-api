import { Request, Response } from 'express';
import { Personagem } from '../models/Personagem';

export class PersonagemController {
  // GET /api/personagens - Listar todos os personagens
  public static async index(req: Request, res: Response): Promise<void> {
    try {
      const personagens = await Personagem.findAll();
      res.status(200).json(personagens);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ erro: 'Erro ao listar personagens.', detalhe: message });
    }
  }

  // GET /api/personagens/:id - Buscar um personagem específico
  public static async show(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
        return;
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        res.status(404).json({ erro: 'Personagem não encontrado.' });
        return;
      }

      res.status(200).json(personagem);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ erro: 'Erro interno.', detalhe: message });
    }
  }

  // POST /api/personagens - Cadastrar um novo personagem
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, raca, poderDeLuta, planetaOrigem } = req.body;

      // Validações de entrada
      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        res.status(400).json({ erro: 'O campo nome é obrigatório e deve ser um texto.' });
        return;
      }
      if (!raca || typeof raca !== 'string' || raca.trim() === '') {
        res.status(400).json({ erro: 'O campo raça é obrigatório e deve ser um texto.' });
        return;
      }

      const novoPersonagem = await Personagem.create({ nome, raca, poderDeLuta, planetaOrigem });
      res.status(201).json(novoPersonagem);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ erro: 'Erro ao criar personagem.', detalhe: message });
    }
  }

  // PUT /api/personagens/:id - Atualizar um personagem existente
  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
        return;
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        res.status(404).json({ erro: 'Personagem não encontrado.' });
        return;
      }

      await personagem.update(req.body);
      res.status(200).json(personagem);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ erro: 'Erro ao atualizar personagem.', detalhe: message });
    }
  }

  // DELETE /api/personagens/:id - Remover um personagem
  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
        return;
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        res.status(404).json({ erro: 'Personagem não encontrado.' });
        return;
      }

      await personagem.destroy();
      res.status(204).send();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(500).json({ erro: 'Erro ao deletar personagem.', detalhe: message });
    }
  }
}