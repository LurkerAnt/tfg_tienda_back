import { Schema, model } from "mongoose";
import Articulo from "../models/articulo";
const pedidoSchema = new Schema({
  idUsuario: {
    type: Number,
    unique: true,
    require: true,
  },
  direccion:{
    type: String,
    unique: true,
    require:true,
  },
  articulos: {
    type: [{ Articulo }],
    unique: true,
    require: true,
  },
  precioTotal: {
    type: {
      type: Schema.Types.Decimal128,
      require: true,
    },
  },
});

export default model("Pedido", pedidoSchema);
