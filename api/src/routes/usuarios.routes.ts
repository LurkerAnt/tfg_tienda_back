import{Router} from 'express';
const router = Router();

import * as usuariosController from '../controllers/usuarios.controller';
//import {cambiarPassword, createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/usuarios.controller';

router.get('/usuario/:id', usuariosController.getUsuario);
router.get("/usuarios", usuariosController.getUsuarios);
router.post("/usuario/signUp", usuariosController.createUsuario);
router.put('/usuario/:id', usuariosController.updateUsuario);
router.delete('/usuario/:id', usuariosController.deleteUsuario);
router.put('/changePassword/:id', usuariosController.cambiarPassword);


export default router;