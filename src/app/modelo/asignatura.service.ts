import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpRequest,HttpEvent} from '@angular/common/http';
import { Constants } from '../constants/constants';
import { ArchivoSubida } from './archivo-subida';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class AsignaturaService {
  //private urlEndPoint:string='http://192.168.8.110:8080/api/';
private urlEndPoint:string=Constants.urlApi+'api/';
  constructor(private http: HttpClient) { }

  getAsignaturas(idCarrera:number, grouped:boolean):Observable<any>{
      return this.http.get(this.urlEndPoint+"degrees/"+idCarrera+"/subjects/?grouped="+grouped);
  }

  getAsignatura(idAsignatura:string):Observable<any>{
    return this.http.get(this.urlEndPoint+"subject/"+idAsignatura);
  }

  subirApuntes(archivoSubida:ArchivoSubida):Observable<HttpEvent<{}>>{
    let formData = new FormData();
    for(let i=0;i<archivoSubida.files.length;i++)formData.append("files",archivoSubida.files[i]);
    formData.append("date", archivoSubida.date.toDateString());
    formData.append("type",archivoSubida.type.toString());
    formData.append("subject",archivoSubida.subject);

    const req = new HttpRequest('POST', `${this.urlEndPoint}uploadFile`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }
}
