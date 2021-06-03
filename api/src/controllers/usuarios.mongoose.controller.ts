import { Request, Response } from "express";
import User, { IUser } from "../models/usuario.moogose";
import jwt from "jsonwebtoken";
import app from "../app";
import { Session } from "node:inspector";


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
    return res.status(200).json({ msg:"Logeado", token: createToken(user) });
  }

  return res.status(400).json({
    msg: "password incorrect",
  });
};