import{RequestHandler} from 'express'
import Articulo from './articulos'

export const createArticulo: RequestHandler = async (req,res) => {
    const articulofound= await Articulo.findOne({nombre: req.body.nombre})
    if(articulofound)
        return res.status(301).json({message:'El articulo ya existe'})

    const articulo = new Articulo(req.body);
    const savedarticulo = await articulo.save();
    console.log(articulo);
    res.json(savedarticulo);
}
export const getArticulos: RequestHandler = async (req,res) => {
    try {
        const articulos = await Articulo.find()
    return res.json(articulos); 
    } catch (error) {
        res.json(error);
    }
}

export const getArticulo: RequestHandler = async(req,res) => {
    const articuloFound = await Articulo.findById(req.params.id)
    if(!articuloFound) return res.status(204).json();
     return res.json(articuloFound);
}

export const updateArticulo: RequestHandler =  async(req,res) => {
   const articuloUpdated = await Articulo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!articuloUpdated) return res.status(204).json();
   res.json(articuloUpdated)
}

export const deleteArticulo: RequestHandler = async (req,res) => {
     const articuloFound = await Articulo.findByIdAndDelete(req.params.id)
      if(!articuloFound) return res.status(204).json();
        return res.json(articuloFound);
}