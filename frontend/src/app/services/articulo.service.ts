import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  
  URL_API = 'http://localhost:3000/articulos'
  constructor(private http: HttpClient) { }

  getArticulos(){
    return this.http.get(this.URL_API); 
  }

}
