import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hackathon } from '../models/hackathon';

@Injectable({
  providedIn: 'root',
})
export class HackathonService {
  private apiUrl = '/api/hackathons';

  constructor(private http: HttpClient) {}

  /**
   * Ottiene tutti gli hackathon dal backend e li adatta al modello frontend
   */
  getAll(): Observable<Hackathon[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(backendData => backendData.map(item => this.adaptToFrontend(item)))
    );
  }

  /**
   * Ottiene un singolo hackathon per ID
   */
  getById(id: number): Observable<Hackathon> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.adaptToFrontend(item))
    );
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

  // Metodo helper per adattare i dati backend al modello frontend
  private adaptToFrontend(backendItem: any): Hackathon {
    return {
      id: backendItem.id,
      title: backendItem.name,         // Backend: name -> Frontend: title
      organizer: backendItem.creator,  // Backend: creator -> Frontend: organizer
      startDate: backendItem.startDate,
      endDate: backendItem.endDate,
      location: backendItem.location,
      partecipanti: backendItem.maxTeams, 
      premio: backendItem.reward ? `${backendItem.reward}€` : '0€', // Backend int -> Frontend string
      description: backendItem.description,
      isOnline: backendItem.online !== undefined ? backendItem.online : backendItem.isOnline,
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', // Immagine placeholder
      status: this.calculateStatus(backendItem.startDate, backendItem.endDate)
    };
  }

  private calculateStatus(start: string, end: string): 'Aperto' | 'In corso' | 'Chiuso' {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now < startDate) {
      return 'Aperto';
    } else if (now >= startDate && now <= endDate) {
      return 'In corso';
    } else {
      return 'Chiuso';
    }
  }
}

