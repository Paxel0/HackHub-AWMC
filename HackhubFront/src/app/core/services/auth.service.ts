import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usa il prefisso /api per passare dal proxy a http://localhost:8080/api/login
  private loginUrl = '/api/login'; 

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  logout(): void {
    // Elimina il token salvato per invalidare la sessione lato client
    localStorage.removeItem('authToken');
  }
}