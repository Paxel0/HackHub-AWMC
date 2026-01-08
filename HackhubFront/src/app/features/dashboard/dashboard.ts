import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Sidebar],
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
      leader: 'Alex',
      membri: [
        'assets/avatar1.png',
        'assets/avatar2.png',
        'assets/avatar3.png'
      ],
      altriMembri: 2
    }
  };

  // Inviti pendenti
  invitiPendenti = [
    {
      iniziali: 'PX',
      team: 'Pixel Pioneers',
      ruolo: 'Designer'
    }
  ];

  // Attività recente
  attivitaRecente = [
    {
      colore: 'blue',
      testo: '<strong>Sarah</strong> ha caricato nuovi mockup per <a href="#">Neural Ninjas</a>',
      tempo: '10 minuti fa'
    },
    {
      colore: 'gray',
      testo: 'Nuovo commento da <strong>Mentor Dave</strong> sul progetto.',
      tempo: '2 ore fa'
    },
    {
      colore:  'orange',
      testo: 'Il tuo team <strong>Code Crushers</strong> è stato registrato a HackRome 24.',
      tempo: 'Ieri'
    },
    {
      colore:  'gray',
      testo: 'Aggiornamento regole per <strong>Global AI Challenge</strong>.',
      tempo: '2 giorni fa'
    }
  ];
}