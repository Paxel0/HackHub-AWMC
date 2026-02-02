import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  // Stats cards data
  stats = {
    hackathonTotali: 12,
    sottomissioniPendenti: 1,
    scadenzaOre: 48,
    scadenzaMinuti: 12
  };

  // Hackathon attivo
  hackathonAttivo = {
    tag: 'GLOBAL AI CHALLENGE 2024',
    tipo: 'ONLINE',
    stato: 'IN CORSO',
    titolo: 'Neural Network Optimization',
    descrizione: 'Sviluppa un algoritmo AI capace di ottimizzare il consumo energetico delle server farm in tempo reale.',
    tempoRimasto: { ore: 48, minuti: 12, secondi: 30 },
    progresso: 75,
    team: {
      nome: 'Neural Ninjas',
      membri: [
        'assets/avatar1.png',
        'assets/avatar2.png',
        'assets/avatar3.png'
      ],
      altriMembri: 2
    }
  };

  

  
}