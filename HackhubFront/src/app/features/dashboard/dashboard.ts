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
  // Starts cards data
  stats = {
    hackathonTotali: 0,
    sottomissioniPendenti: 0, 
    scadenzaOre: 0,           
    scadenzaMinuti: 0       
  };

  // Hackathon attivo: quando viene implementato l'endpoint registrazioni compare l'hackathon a cui l'utente è iscritto
  hackathonAttivo: any = null;

  constructor(private hackathonService: HackathonService) {}

  ngOnInit() {
    this.loadStats();
    this.loadActiveSubscription();
  }

  loadStats() {
    // Carica il numero totale di hackathon disponibili
    this.hackathonService.getAll().subscribe({
      next: (hackathons) => {
        this.stats.hackathonTotali = hackathons.length;
      },
      error: (err) => console.error('Errore caricamento dashboard', err)
    });
  }

  loadActiveSubscription() {
    this.hackathonService.getMySubscription().subscribe({
      next: (hackathon) => {
        if (hackathon) {
          this.hackathonAttivo = {
            id: hackathon.id,
            tag: 'EVENTO SOTTOSCRITTO',
            tipo: hackathon.isOnline ? 'ONLINE' : 'ONSITE',
            stato: hackathon.status ? hackathon.status.toUpperCase() : 'APERTO',
            titolo: hackathon.name,
            descrizione: hackathon.description,
            tempoRimasto: this.calculateTimeRemaining(hackathon.endDate),
            progresso: 0, 
            team: null
          };
        } else {
           this.hackathonAttivo = null; 
        }
      },
      error: (err) => console.error('Errore caricamento iscrizione', err)
    });
  }

  private calculateTimeRemaining(endDateStr: string) {
    const end = new Date(endDateStr).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    if (distance < 0) {
      return { giorni: 0, ore: 0, minuti: 0 };
    }

    const giorni = Math.floor(distance / (1000 * 60 * 60 * 24));
    const ore = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minuti = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    return { giorni, ore, minuti };
  }

  unsubscribe() {
    if (!this.hackathonAttivo) return;
    
    this.hackathonService.toggleSubscription(this.hackathonAttivo.id).subscribe({
      next: () => {
        this.hackathonAttivo = null;
        this.loadStats();
      },
      error: (err) => console.error('Errore discrizione', err)
    });
  }}