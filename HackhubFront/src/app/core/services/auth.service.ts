import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // L'URL punta a /api, che il proxy girerà a http://localhost:8080/api/login
  private loginUrl = '/login'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}