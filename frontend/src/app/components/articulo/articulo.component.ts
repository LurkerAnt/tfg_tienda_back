import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
