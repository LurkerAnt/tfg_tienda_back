import{RequestHandler} from 'express'
import Articulo from './articulos'

export const createArticulo: RequestHandler = async (req,res) => {
    const articulo = new Articulo(req.body);
    const savedarticulo = await articulo.save();
    console.log(articulo);
    res.json(savedarticulo);
}
export const getArticulos: RequestHandler = (req,res) => {
    res.json('obteniendo todos los articulos de la tienda')
}

export const getArticulo: RequestHandler = (req,res) => {
    res.json('obteniendo un articulo')
}

export const updateArticulo: RequestHandler = (req,res) => {
    res.json('actualizando un articulo')
}

export const deleteArticulo: RequestHandler = (req,res) => {
    res.json('eliminando el ariticulo de la tienda')
}