import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  
  URL_API = 'http://localhost:3000/articulos'
  
 //array de articulos para almacenar la peticion get con todos los datos
  articulos: Articulo[];
  //objeto que almacena los datos que vienen por el formulario
  formArticulo: Articulo ={
    nombre:'',
    tipo:'',
    color:'',
    url:'',
    existencias:true,
    precio:0,
    oferta:true
  };
  
  constructor(private http: HttpClient) { }

  getArticulos(){
    return this.http.get<Articulo[]>(this.URL_API); 
  }

  createArticulo(articulo: Articulo){
     return this.http.post(this.URL_API, articulo);
  }

  updateArticulo(articulo: Articulo){
    return this.http.put(`${this.URL_API}/${articulo._id}`,articulo);
  }

  deleteArticulo(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }

}
