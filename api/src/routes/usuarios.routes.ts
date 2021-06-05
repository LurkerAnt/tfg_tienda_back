import{Router} from 'express';
const router = Router();

//import * as usuariosController from '../controllers/usuarios.controller';
//import {cambiarPassword, createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from '../controllers/usuarios.controller';
import * as usuariosControllerMongoose from '../controllers/usuarios.mongoose.controller';
router.get('/usuarios/:id', usuariosControllerMongoose.getUsuario);
router.get("/usuarios", usuariosControllerMongoose.getUsuarios);
router.post("/usuarios/create", usuariosControllerMongoose.createUsuario);
router.put('/usuarios/:id', usuariosControllerMongoose.updateUsuario);
router.delete('/usuarios/:id', usuariosControllerMongoose.deleteUsuario);
//router.put('/changePassword/:id', usuariosControllerMongoose.cambiarPassword);
router.post('/usuarios/signUp', usuariosControllerMongoose.signUp);
router.post('/usuarios/signIn',usuariosControllerMongoose.signIn);


export default router;