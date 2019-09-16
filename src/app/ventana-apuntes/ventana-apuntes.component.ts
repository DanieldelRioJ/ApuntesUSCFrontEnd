import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../modelo/Asignatura';
import { AsignaturaService } from '../modelo/asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { Apunte } from '../modelo/apunte';
import { ApunteService } from '../modelo/apunte.service';
import { Title, Meta } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ventana-apuntes',
  templateUrl: './ventana-apuntes.component.html',
  styleUrls: ['./ventana-apuntes.component.css']
})
export class VentanaApuntesComponent implements OnInit {

  asignatura:Asignatura;
  apuntes:Apunte[];

  constructor(private _sanitizer: DomSanitizer,private asignaturaService:AsignaturaService, private activatedRoute: ActivatedRoute,private apunteService:ApunteService, private title: Title, private meta:Meta) {
  }

  ngOnInit() {
    this.cargarAsignatura();
  }

  getBackgroundImageSinatize(apunte:Apunte){
    return this._sanitizer.bypassSecurityTrustStyle(`url(https://apuntesusc.es/api/api/documents/coverpage/low/${apunte.id})`);
  }

  cargarAsignatura():void{
    this.activatedRoute.params.subscribe(params => {
      let idAsignatura = params['id'];
      if (idAsignatura) {
        this.asignaturaService.getAsignatura(idAsignatura).subscribe(json=>{
          this.asignatura=json.subject;
          this.title.setTitle("Apuntes USC | Descargar apuntes de "+this.asignatura.name);
          this.meta.updateTag({ name: 'description', content: 'En Apuntes USC podrás descargar apuntes de '+this.asignatura.name+' USC o subir tus propios apuntes. Apuntes USC gratis.' });
        });
        this.apunteService.getApuntesBySubject(idAsignatura).subscribe(json=>this.apuntes=json.apuntes);
      }
    });
  }

}
