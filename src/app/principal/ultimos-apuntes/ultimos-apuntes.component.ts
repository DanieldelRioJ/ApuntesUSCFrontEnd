import { Component, OnInit } from '@angular/core';
import {Asignatura} from '../../modelo/Asignatura';
import {Rama} from '../../modelo/rama';
import {AsignaturaService} from '../../modelo/asignatura.service';
import {RamaService} from '../../modelo/rama.service';
import {GradoService} from '../../modelo/grado.service';
import {ApunteService} from '../../modelo/apunte.service';
import {Grado} from '../../modelo/grado';
import {Apunte} from '../../modelo/apunte';

@Component({
  selector: 'app-ultimos-apuntes',
  templateUrl: './ultimos-apuntes.component.html',
  styleUrls: ['./ultimos-apuntes.component.css']
})
export class UltimosApuntesComponent implements OnInit {

  ramas:Rama[];
  grados:Grado[];
  degreeMap:any;
  asignaturas: Asignatura[];
  ramaSeleccionada:any;
  carreraSeleccionada:any;
  asignaturaSeleccionada:any;
  ultimosApuntes:Apunte[];

  constructor(private asignaturaService: AsignaturaService, private ramaService:RamaService, private gradoService: GradoService, private apunteService: ApunteService) { }

  ngOnInit() {
    this.actualizarSelects();
    this.actualizaTabla();
  }

  actualizarSelects():void{
    this.ramaService.getRamas().subscribe(json=>this.ramas=json.branches);
    this.gradoService.getGrados().subscribe(json=>this.degreeMap=json.degrees);
  }

  actualizaTabla():void{
    this.apunteService.getUltimosApuntes(0,5 ,this.ramaSeleccionada, this.carreraSeleccionada, this.asignaturaSeleccionada).subscribe(json=>this.ultimosApuntes=json.content);
  }

  nuevaAsignaturaSeleccionada($event):void{
    this.actualizaTabla();
  }

  nuevoGradoSeleccionado($event):void{
    this.asignaturaSeleccionada=undefined;
    if(this.carreraSeleccionada!=undefined)this.asignaturaService.getAsignaturas(this.carreraSeleccionada,true).subscribe((json)=>{
        this.asignaturas=json
      }
    );
    this.actualizaTabla();
  }

  nuevaRamaSeleccionada($event):void{
    if(this.ramaSeleccionada!=undefined)this.gradoService.getGradosByRamaId(this.ramaSeleccionada).subscribe((json)=>{
      this.grados=json.degrees}
    );
    this.carreraSeleccionada=undefined;
    this.actualizaTabla();
  }

}
