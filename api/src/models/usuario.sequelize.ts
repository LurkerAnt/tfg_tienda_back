import { PRIORITY_ABOVE_NORMAL } from "node:constants";
import Sequelize, { DataTypes } from "sequelize";
import { sequelize } from "../dbpostgredatabase";
import bcrypt from "bcrypt";


export const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value: string) {
        const hash = bcrypt.hashSync(value, 8);
        this.setDataValue("password", hash);
      },
    },

    apellido: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);


     
     
export default Usuario;
