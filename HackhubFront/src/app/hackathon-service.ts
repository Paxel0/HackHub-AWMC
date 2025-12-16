//è il “telefono” del frontend verso il backend per gli hackathon: 
//contiene le chiamate HTTP (es. GET, POST…) per leggere o inviare dati sugli hackathon.
//Invece di scrivere fetch ovunque, i componenti chiedono a questo service i dati (list(), ecc.) 
//e lui parla con l’API /api/hackathons, restituendo i risultati al componente.

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hackathon {
  id?: number;
  nome: string;
  descrizione: string;
  dataInizio: string;
  dataFine: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class HackathonService {
  private http = inject(HttpClient);

  list(): Observable<string> {
  return this.http.get('/hackathons', { responseType: 'text' });
}
}