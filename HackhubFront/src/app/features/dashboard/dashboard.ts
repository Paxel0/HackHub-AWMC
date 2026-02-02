import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackathonService } from '../../core/services/hackathon';
import { Hackathon } from '../../core/models/hackathon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  // Stats cards data
  stats = {
    hackathonTotali: 0,
    sottomissioniPendenti: 0, // Dato non disponibile dal backend attuale
    scadenzaOre: 0,           // Dato non disponibile dal backend attuale
    scadenzaMinuti: 0        // Dato non disponibile dal backend attuale
  };

  // Hackathon attivo (Placeholder finché non viene implementato l'endpoint registrazioni)
  hackathonAttivo: any = null;

  constructor(private hackathonService: HackathonService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // 1. Carica il numero totale di hackathon disponibili
    this.hackathonService.getAll().subscribe({
      next: (hackathons) => {
        this.stats.hackathonTotali = hackathons.length;
        
        if (hackathons.length > 0) {
           // Logica placeholder: prendi il primo hackathon come "attivo" per demo
           const active = hackathons[0];
           this.hackathonAttivo = {
             tag: 'EVENTO IN EVIDENZA',
             tipo: active.isOnline ? 'ONLINE' : 'ONSITE',
             stato: active.status.toUpperCase(),
             titolo: active.title,
             descrizione: active.description,
             tempoRimasto: this.calculateTimeRemaining(active.endDate),
             progresso: 65, // Valore simulato per demo
             team: { 
               nome: 'Tuo Team', 
               membri: ['https://ui-avatars.com/api/?name=User+One', 'https://ui-avatars.com/api/?name=User+Two'], 
               altriMembri: 1 
             }
           };
        }
      },
      error: (err) => console.error('Errore caricamento dashboard', err)
    });
  }

  private calculateTimeRemaining(endDateStr: string) {
    const end = new Date(endDateStr).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) {
      return { ore: 0, minuti: 0, secondi: 0 };
    }

    const ore = Math.floor(distance / (1000 * 60 * 60));
    const minuti = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondi = Math.floor((distance % (1000 * 60)) / 1000);

    return { ore, minuti, secondi };
  }
}