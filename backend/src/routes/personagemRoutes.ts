import { Router } from 'express';
import { PersonagemController } from '../controllers/PersonagemController';

const router = Router();

router.get('/', PersonagemController.index);
router.get('/:id', PersonagemController.show);
router.post('/', PersonagemController.create);
router.put('/:id', PersonagemController.update);
router.delete('/:id', PersonagemController.delete);

export { router as personagemRoutes };