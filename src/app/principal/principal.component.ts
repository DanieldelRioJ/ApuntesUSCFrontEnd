import { Component, OnInit } from '@angular/core';
import { ApunteService } from '../modelo/apunte.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  cantidadApuntes:any="...";
  cantidadAsignaturas:any="...";
  cantidadCarreras:any="...";

  constructor(private apunteService:ApunteService, private title:Title, private meta:Meta) { }

  ngOnInit() {
    this.actualizaValoresEstadisticos();
    this.title.setTitle("Apuntes USC | Descargar apuntes de la USC sin registro");
    this.meta.updateTag({ name: 'description', content: 'Descarga todos los apuntes de cualquier carrera y asignatura de la USC o comparte los tuyos, sin límite de descargas ni registro. Gratis.' });
  }

  actualizaValoresEstadisticos():void{
    this.apunteService.getEstadisticas().subscribe(json=>{
      this.cantidadApuntes=json.cantidadApuntes;
      this.cantidadAsignaturas=json.cantidadAsignaturas;
      this.cantidadCarreras=json.cantidadCarreras;
    });
  }

}
