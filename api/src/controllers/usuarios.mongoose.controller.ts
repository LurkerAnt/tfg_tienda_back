import { Request, RequestHandler, Response } from "express";
import User, { IUser } from "../models/usuario.moongose";
import jwt from "jsonwebtoken";
import app from "../app";
import { Session } from "node:inspector";
import { session } from "passport";
import path from "node:path";


function createToken(user: IUser) {
  return jwt.sign({ id: user.id, email: user.email }, 'tokenSecreto', {
    expiresIn: 86400,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {  
    const token =  createToken(user);
    res.cookie("SESSIONID", token,{ httpOnly: true, secure: true }).send;
    console.log("logueado");
    return res.status(200).json({token: createToken(user)});
  }

  return res.status(400).json({
    msg: "password incorrect",
  });
};

export const createUsuario: RequestHandler = async (req, res) => {
  try{
    const usuariofound = await User.findOne({ nombre: req.body.email });
    if (usuariofound)
      return res.status(301).json({ message: "El usuario ya existe" });
    const usuario = new User(req.body);
    const savedusuario = await usuario.save();
    console.log(usuario);
    return res.json(savedusuario);
  }catch(error){
    console.log(error);
  }
  
};

export const getUsuarios: RequestHandler = async (req, res) => {
  try {
    const usuarios = await User.find();
    return res.json(usuarios);
  } catch (error) {
    return res.json(error);
  }
};

export const getUsuario: RequestHandler = async (req, res) => {
  try {
    const usuariofound = await User.findById(req.params.id);
    if (!usuariofound) return res.status(204).json();
    return res.json(usuariofound);
  } catch (error) {
    return res.json(error);
  }
};

export const updateUsuario: RequestHandler = async (req, res) => {
  try{
    const usuarioUpdated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!usuarioUpdated) return res.status(304).json();
    return res.json(usuarioUpdated);
  }catch(error){
    console.log(error);
  }
  
};

export const deleteUsuario: RequestHandler = async (req, res) => {
  try{
    const usuarioFound = await User.findByIdAndDelete(req.params.id);
    if (!usuarioFound) return res.status(204).json();
    return res.json(usuarioFound);
  }catch(error){
    console.log(error);
  }
  
};