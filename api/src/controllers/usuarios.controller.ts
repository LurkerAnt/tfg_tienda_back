/*import { request, Request, response, Response } from "express";
import { json, TimeoutError } from "sequelize/types";
import { sequelize } from "../dbpostgredatabase";
import { comparePasswordFunction, Usuario } from "../models/usuario.sequelize";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


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
}

export const cambiarPassword = async (req: Request, res: Response)=>{
  const {id} = req.params;
  let { password } = req.body;
  try{
      await Usuario.update({
        password:password     
      },    
      {
        where: {id},  
      });
        
       res.json({
         message: "contraseña cambiada",
       });
  } catch(error){
        console.log(error);
     }

}

export const signUp = async (req: Request, res: Response) => {
  let{nombre,apellido,email,password,fecha} = req.body;
  if(!req.body.email || !req.body.password) {
    return res.status(400).json({msg: 'Por favor introduce email y contraseña'})
  }
   let usuarioRegistrado = await Usuario.findOne({
      where:{
        email,
      }
    });
    if(usuarioRegistrado){
      return res.status(400).json({
        message:'email en uso'
      })
    }
    else{
      try {
        let usuarioRegistrado = await Usuario.create({
          nombre: nombre,
          password: password,
          apellido: apellido,
          email: email,
          fecha: fecha,
        });

        if (usuarioRegistrado)
          res.json({
            message: "Usuario registrado correctamente"
          });
      } catch (error) {
        res.status(500).json({
          message: "usuario no registrado",
          data: {},
          error: error,
        });
      }
    }
  
}

export const signIn = async (req: Request, res: Response) =>{
  let{email,password} = req.body;
try{
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: " por favor introduzca email y contraseña" });
  }
  let usuario = await Usuario.findOne({
    where: {
      email,
    },
  });
  if(!usuario){
    return res.status(400).json({message:'El usuario no existe'})
  }
  let x:boolean
  
  //const isMatch = await comparePasswordFunction(password,);
   if(false){
     return res.status(200).json({toke: createToken(usuario)})
   }

   return res.status(400).json({
     message:'email o contraseña incorrectos'
   })
  
}catch(error){

}
  
}

function createToken(user: any){
  
if(user instanceof Usuario){
jwt.sign(
  { id: user.getDataValue("id"), email: user.getDataValue("email") },
  "tokensecreto",{
    expiresIn:86400
  }
);
}

  
}

export const correctPassword = (password:string, passwordBD:string) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, passwordBD, (err, res) => {
      resolve(res);
    });
  });
};


*/