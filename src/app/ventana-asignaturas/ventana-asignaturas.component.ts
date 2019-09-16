import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../modelo/asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { Asignatura } from '../modelo/Asignatura';
import { Grado } from '../modelo/grado';
import { GradoService } from '../modelo/grado.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-ventana-asignaturas',
  templateUrl: './ventana-asignaturas.component.html',
  styleUrls: ['./ventana-asignaturas.component.css']
})
export class VentanaAsignaturasComponent implements OnInit {

  asignaturas:[Asignatura[]];
  grado:Grado;

  constructor(private asignaturaService:AsignaturaService,private activatedRoute: ActivatedRoute,
  private gradoService:GradoService,
  private title: Title,
  private meta:Meta) { }

  ngOnInit() {
    this.cargarAsignaturas();
  }

  cargarAsignaturas():void{
    this.activatedRoute.params.subscribe(params => {
      let idCarrera = params['id'];
      if (idCarrera) {
        this.asignaturaService.getAsignaturas(idCarrera,true).subscribe((json) => this.asignaturas=json);
        this.gradoService.getGradosById(idCarrera).subscribe(grado=>{
          this.grado=grado
          this.title.setTitle("Apuntes USC | Descargar apuntes de "+this.grado.name);
          this.meta.updateTag({ name: 'description', content: 'En Apuntes USC podrás descargar gratis todos los apuntes de '+this.grado.name+' USC y de todas sus asignaturas o subir tus propios apuntes.' });
        });
      }
    });
  }

}
