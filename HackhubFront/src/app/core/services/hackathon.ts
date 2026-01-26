import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hackathon } from '../models/hackathon';

@Injectable({
  providedIn: 'root',
})
export class HackathonService {
  private apiUrl = '/api/hackathons';

  constructor(private http: HttpClient) {}

  /**
   * Ottiene tutti gli hackathon
   */
  getAll(): Observable<Hackathon[]> {
    return this.http.get<Hackathon[]>(this.apiUrl);
  }

  /**
   * Ottiene un singolo hackathon per ID
   */
  getById(id: number): Observable<Hackathon> {
    return this.http.get<Hackathon>(`${this.apiUrl}/${id}`);
  }

  /**
   * Iscrive l'utente corrente a un hackathon
   */
  register(hackathonId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${hackathonId}/registrations`, {});
  }

  /**
   * Annulla l'iscrizione dell'utente corrente a un hackathon
   */
  cancelRegistration(hackathonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${hackathonId}/registrations/me`);
  }

  /**
   * Verifica se l'utente è iscritto a un hackathon
   */
  isRegistered(hackathonId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${hackathonId}/registrations/me/status`);
  }
}

