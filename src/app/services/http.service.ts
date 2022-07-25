import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  carrefourUrl = "http://localhost:3000/api/getFromCarrefour?q="
  jumiaUrl = "http://localhost:3000/api/getFromJumia?q="
  constructor(private readonly http: HttpClient) { }

  getFromCarrefour(query: string): Observable<any> {

    return this.http.get(this.carrefourUrl + query);
  }

  getFromJumia(query: string): Observable<any> {
    return this.http.get(this.jumiaUrl + query);
  }
}
