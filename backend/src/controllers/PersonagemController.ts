import { Request, Response } from 'express';
import { Personagem } from '../models/Personagem';

export class PersonagemController {
  // GET /api/personagens - Listar todos os personagens
  public static async index(req: Request, res: Response): Promise<Response> {
    try {
      const personagens = await Personagem.findAll();
      return res.status(200).json(personagens);
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro ao listar personagens.', detalhe: error.message });
    }
  }

  // GET /api/personagens/:id - Buscar um personagem específico
  public static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        return res.status(404).json({ erro: 'Personagem não encontrado.' });
      }

      return res.status(200).json(personagem);
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro interno.', detalhe: error.message });
    }
  }

  // POST /api/personagens - Cadastrar um novo personagem
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, raca, poderDeLuta, planetaOrigem } = req.body;

      // Validações de entrada
      if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ erro: 'O campo nome é obrigatório e deve ser um texto.' });
      }
      if (!raca || typeof raca !== 'string' || raca.trim() === '') {
        return res.status(400).json({ erro: 'O campo raça é obrigatório e deve ser um texto.' });
      }

      const novoPersonagem = await Personagem.create({ nome, raca, poderDeLuta, planetaOrigem });
      return res.status(201).json(novoPersonagem);
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro ao criar personagem.', detalhe: error.message });
    }
  }

  // PUT /api/personagens/:id - Atualizar um personagem existente
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        return res.status(404).json({ erro: 'Personagem não encontrado.' });
      }

      await personagem.update(req.body);
      return res.status(200).json(personagem);
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro ao atualizar personagem.', detalhe: error.message });
    }
  }

  // DELETE /api/personagens/:id - Remover um personagem
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ erro: 'O ID informado deve ser um número válido.' });
      }

      const personagem = await Personagem.findByPk(id);
      if (!personagem) {
        return res.status(404).json({ erro: 'Personagem não encontrado.' });
      }

      await personagem.destroy();
      return res.status(204).send(); // 204 significa No Content (Exclusão realizada com sucesso e sem corpo de resposta)
    } catch (error: any) {
      return res.status(500).json({ erro: 'Erro ao deletar personagem.', detalhe: error.message });
    }
  }
}