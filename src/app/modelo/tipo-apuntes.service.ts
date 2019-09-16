import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoApuntesService {
  private urlEndPoint:string=Constants.urlApi+'api/classNoteTypes/';
  constructor(private http: HttpClient) { }

  getTipoApuntes(): Observable<any>{
    return this.http.get(this.urlEndPoint);
  }
}
