import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAPIService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }

  apiURL = 'https://my-json-server.typicode.com/jocasas/testsv';

  constructor(private http:HttpClient) { }
  getUser(userId):Observable<any>{
    return this.http.get(this.apiURL+'/alumnos/'+userId).pipe(
      retry(3)
    );
  }
  
  getUsers():Observable<any>{
    return this.http.get(this.apiURL+'/alumnos/').pipe(
      retry(3)
    );
  }

}


