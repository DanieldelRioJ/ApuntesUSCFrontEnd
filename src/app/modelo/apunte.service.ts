import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../constants/constants';

@Injectable()
export class ApunteService {

  //private urlEndPoint:string='http://192.168.8.110:8080/api/apuntes/';
  private urlEndPoint:string=Constants.urlApi+'api/apuntes/';
  constructor(private http: HttpClient) { }

  getUltimosApuntes(page:number, quantity:number, rama:number, carrera: number, asignatura:number): Observable<any>{
    let url:string=this.urlEndPoint+"ultimosApuntes/"+page+"?cantidad="+quantity;
    if(asignatura!==undefined) url+="&asignatura="+asignatura;
    else if(carrera!==undefined) url+="&carrera="+carrera;
    else if(rama!==undefined)url+="&rama="+rama;
    return this.http.get(url);
  }

  getApuntesBySubject(idSubject:string):Observable<any>{
    return this.http.get(this.urlEndPoint+"buscaPorAsignatura/"+idSubject);
  }

  getEstadisticas():Observable<any>{
    return this.http.get(this.urlEndPoint+"count");
  }
}
