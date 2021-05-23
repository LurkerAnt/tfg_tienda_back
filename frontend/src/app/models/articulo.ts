import { precio } from "./precio";

export interface Articulo{
    _id?: string
    nombre: string
    tipo: string
    color: string
    url: string
    existencias: boolean
    precio: Array<precio> 
    oferta: boolean
}