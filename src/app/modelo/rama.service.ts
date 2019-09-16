import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Constants } from '../constants/constants';

@Injectable()
export class RamaService {

  //private urlEndPoint:string='http://192.168.8.110:8080/api/branches/';
  private urlEndPoint:string=Constants.urlApi+'api/branches/';

  constructor(private http: HttpClient) { }

  getRamas(): Observable<any>{
    return this.http.get(this.urlEndPoint);
  }
}
