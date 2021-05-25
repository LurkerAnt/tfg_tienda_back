import { Request, Response } from "express";
import { TimeoutError } from "sequelize/types";
import { sequelize } from "../dbpostgredatabase";
import { Usuario } from "../models/usuario.sequelize";
import bcrypt from "bcrypt";
import { any } from "sequelize/types/lib/operators";

export const getUsuario = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const usuario = await Usuario.findOne({
      where:{
        id
      }
    });
    res.json(usuario);
  } catch(error){
    console.log('error al conseguir el usuario');
  }
}


export const getUsuarios = async (req: Request, res: Response) =>{
  try{
    const usuarios = await Usuario.findAll({
      order: [["id", "ASC"]],
    });
    res.json({
      data: usuarios
    });
  } catch(error){
    console.log('error al obtener todos los usuarios');
  }
}
export const createUsuario = async (req: Request, res: Response) => {
  let { nombre, password, apellido, email, fecha, admin } = req.body;
  try {

      let hash = bcrypt.hashSync(password, 8);
      password = hash;
    let newUsuario = await Usuario.create({
      nombre: nombre,
      password: password,
      apellido: apellido,
      email: email,
      fecha: fecha,
      admin: admin,
    });

    if (newUsuario) 
        res.json({message: 'Usuario registrado correctamente',
          data: newUsuario});
  } catch (error) {
    res.status(500).json({
      message: "usuario no creado",
      data: {},
      error:error
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   const usuarioBorrado = await Usuario.destroy({
      where: {
        id,
      },
    });
    res.json({
      message: "Usuario borrado",
      count: usuarioBorrado
    });
  } catch (error) {
    console.log("error a la hora de borrar el usuario");
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, password, apellido, email, fecha, admin } = req.body;

  try {
    const usuario = await Usuario.findOne({
      attributes: ["nombre", "password", "apellido", "email", "fecha", "admin"],
      where: { id },
    });
    const usuarioActualizado = await usuario?.update({
        id,
        nombre,
        password,
        apellido,
        email,
        fecha,
        admin
    },
    {
        where:{id}
    });
    return res.json({
      message: "Usuario actualizado",
      data: usuarioActualizado
    });
  } catch (error) {
    console.log(error);
    console.log("error en la actualizacion de usuario");
  }
};

/*
export const cambiarPassword = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const { password } = req.body;

    try{
        const oldPassword = await Usuario.findOne({
            attributes:['password'],
            where:{id}
        });
        
        const newPassword = await oldPassword?.update({
            id,
            password
        },
        {
            where: {id}
        });
        res.json(newPassword);
         console.log('Contraseña cambiada');
    } catch(error){
        console.log(error);
        console.log('no se ha podido cambiar la contraseña');
    }
}*/

export const cambiarPassword = async (req: Request, res: Response)=>{
  const {id} = req.params;
  let { password } = req.body;
  try{

    let hash = bcrypt.hashSync(password, 8);
    password=hash;
      await Usuario.update({
        password:password     
      },    
      {
        where: {id},  
      });
      
       res.json({
         password,
         message: "contraseña cambiada",
       });
  } catch(error){
        console.log(error);
     }

}

export const signUp = async (req: Request, res: Response) => {
  let{nombre,password, email,fecha} = req.body;
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Por favor introduce email y contraseña'})
  }
   const usuarioRegistrado = await Usuario.findOne({
      where:{
        email,
      }
    });
    if(usuarioRegistrado){
      res.json({
        message:'email en uso'
      })
    }
    else{

    }
  res.send('recibido')
}