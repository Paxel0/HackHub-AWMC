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
   * Iscrive o disiscrive l'utente corrente a un hackathon (toggle)
   */
  toggleSubscription(hackathonId: number): Observable<Hackathon | null> {
    return this.http.post<any>(`${this.apiUrl}/${hackathonId}/subscription`, {}).pipe(
      map(response => response ? this.adaptToFrontend(response) : null)
    );
  }

  /**
   * Ottiene l'hackathon a cui l'utente è iscritto (se presente)
   */
  getMySubscription(): Observable<Hackathon | null> {
    return this.http.get<any>(`${this.apiUrl}/me/subscription`).pipe(
      map(response => response ? this.adaptToFrontend(response) : null)
    );
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

