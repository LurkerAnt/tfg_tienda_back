import{Router} from 'express';
const router = Router();

import * as articulosController from '../controllers/articulos.controller';

router.get('/articulos', articulosController.getArticulos);
router.get('/articulos/:id', articulosController.getArticulo);
router.post('/articulos', articulosController.createArticulo);
router.delete('/articulos/:id', articulosController.deleteArticulo);
router.put('/articulos/:id', articulosController.updateArticulo);

export default router;