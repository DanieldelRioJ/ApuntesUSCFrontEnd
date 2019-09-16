import { Component, OnInit } from '@angular/core';
import {MDCRipple} from '@material/ripple';
import { FileValidator } from 'ngx-material-file-input';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TipoApuntesService } from '../modelo/tipo-apuntes.service';
import { TipoApunte } from '../modelo/tipo-apunte';
import { GradoService } from '../modelo/grado.service';
import { RamaService } from '../modelo/rama.service';
import { Grado } from '../modelo/grado';
import { Asignatura } from '../modelo/Asignatura';
import { AsignaturaService } from '../modelo/asignatura.service';
import { ArchivoSubida } from '../modelo/archivo-subida';
import { HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subir-apuntes',
  templateUrl: './subir-apuntes.component.html',
  styleUrls: ['./subir-apuntes.component.css']
})
export class SubirApuntesComponent implements OnInit {
  //100MB
 readonly maxSize = 104857600; //En bytes
  subirApuntesForm: FormGroup;
  tipoApuntes:TipoApunte;
  ramas;
  degreeMap;
  grados:Grado[];
  asignaturas: [Asignatura[]];

  ramaSeleccionada:number;
  carreraSeleccionada:number;
  archivoSubida:ArchivoSubida=new ArchivoSubida();

  progreso:number=0;
  subiendo:boolean=false;

  constructor(private _fb: FormBuilder,
    private tipoApuntesSerice:TipoApuntesService,
    private ramaService:RamaService,
    private gradoService:GradoService,
    private asignaturaService:AsignaturaService) { }

  ngOnInit() {
    this.actualizarSelects();
    this.tipoApuntesSerice.getTipoApuntes().subscribe(json=>this.tipoApuntes=json.types);
    new MDCRipple(document.querySelector('.mdc-fab'));
    this.subirApuntesForm=this._fb.group({
        requiredfile: [
          undefined,
          [Validators.required, FileValidator.maxContentSize(this.maxSize)]
        ],
        requiredSubject:[Validators.required]
      });
  }

  nuevoGradoSeleccionado($event):void{
    this.archivoSubida.subject=undefined;
    if(this.carreraSeleccionada!=undefined)this.asignaturaService.getAsignaturas(this.carreraSeleccionada,true).subscribe((json)=>{
      this.asignaturas=json}
    );
  }

  nuevaRamaSeleccionada($event):void{
    if(this.ramaSeleccionada!=undefined) this.gradoService.getGradosByRamaId(this.ramaSeleccionada).subscribe((json)=>{
      this.grados=json.degrees}
    );
  }

  actualizarSelects():void{
    this.ramaService.getRamas().subscribe(json=>this.ramas=json.branches);
    this.gradoService.getGrados().subscribe(json=>this.degreeMap=json.degrees);
  }

  subir():void{
    this.subiendo=true;
    this.asignaturaService.subirApuntes(this.archivoSubida).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.subiendo=true;
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            this.subiendo=false;
            //let response: any = event.body;
            swal.fire('Los apuntes se han subido correctamente!','', 'success');
          }
        },error=>console.log(error));
  }


}
