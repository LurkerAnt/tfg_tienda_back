/*import Sequelize from "sequelize";
import { sequelize } from "../dbpostgredatabase";
import bcrypt from "bcryptjs";


export const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        const rawValue = this.getDataValue("id");
        return rawValue;
      },
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("password");
        return rawValue;
      },
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
      get() {
        const rawValue = this.getDataValue("email");
        return rawValue;
      },
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      get() {
        const rawValue = this.getDataValue("admin");
        return rawValue;
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);




export var comparePasswordFunction = Usuario.prototype.comparePassword = function (password: string, cb:(err: any, isMatch:boolean)=>boolean) {
  
  bcrypt.compare(password, this.password, function  (err, isMatch): boolean  {
    if (err) {
      return cb(err,isMatch);
    }
    console.log(isMatch);
    let x: any;
    return cb(x, isMatch);
  });
};

/*
Usuario.hashPassword = function(password:string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

Usuario.isValidPassword = function (password, hash) {
  return bcrypt.compareSync(hash, password);
};
export default Usuario;


*/