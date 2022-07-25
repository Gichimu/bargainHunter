import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  carrefourUrl = "http://localhost:3000/api/getFromCarrefour?q='"
  jumiaUrl = "http://localhost:3000/api/getFromJumia?q=flour"
  constructor(private readonly http: HttpClient) { }

  getFromCarrefour(query: string): Observable<any> {
    if(query === ""){
      query = "''"
    }
    return this.http.get(this.carrefourUrl + query);
  }

  getFromJumia(): Observable<any> {
    return this.http.get(this.jumiaUrl);
  }
}
