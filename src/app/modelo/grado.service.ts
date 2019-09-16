import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  //private urlEndPoint:string='http://192.168.8.110:8080/api/degrees/';
private urlEndPoint:string=Constants.urlApi+'api/degrees/';
  constructor(private http: HttpClient) { }

  getGrados(): Observable<any>{
    return this.http.get(this.urlEndPoint);
  }

  getGradosByRamaId(ramaId: any): Observable<any>{
    return this.http.get(this.urlEndPoint+"?branchId="+ramaId);
  }

  getGradosById(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+id);
  }
}
