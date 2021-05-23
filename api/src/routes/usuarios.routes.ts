import{Router} from 'express';
const router = Router();

import {cambiarPassword, createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/usuarios.controller';

router.get('/usuario/:id', getUsuario);
router.get("/usuarios", getUsuarios);
router.post('/usuario/signUp', createUsuario);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);
router.put('/changePassword/:id', cambiarPassword);


export default router;