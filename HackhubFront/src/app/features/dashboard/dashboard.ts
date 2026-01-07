import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  // Dati utente
  user = {
    name: 'Alex',
    role: 'Full Stack Dev',
    avatar: 'assets/avatar-placeholder.png' // Sostituisci con il percorso reale se c'è
  };

  // Statistiche
  stats = {
    totalHackathons: 12,
    pendingSubmissions: 1,
    urgentDeadline: '48h : 12m'
  };

  // Hackathon Attivo
  activeHackathon = {
    title: 'Neural Network Optimization',
    event: 'GLOBAL AI CHALLENGE 2024',
    type: 'ONLINE',
    description: 'Sviluppa un algoritmo AI capace di ottimizzare il consumo energetico delle server farm in tempo reale.',
    timeLeft: '48 : 12 : 30',
    progress: 75, // Percentuale completamento
    teamName: 'Neural Ninjas',
    teamLeader: 'Alex',
    teamMembers: [1, 2, 3] // Placeholder per avatar
  };

  // Inviti
  pendingInvite = {
    teamName: 'Pixel Pioneers',
    role: 'Designer',
    from: 'Sarah'
  };

  // Attività Recente
  activities = [
    { type: 'upload', user: 'Sarah', text: 'ha caricato nuovi mockup per', project: 'Neural Ninjas', time: '10 minuti fa' },
    { type: 'comment', user: 'Mentor Dave', text: 'Nuovo commento da', project: 'sul progetto', time: '2 ore fa' },
    { type: 'system', user: 'System', text: 'Il tuo team Code Crushers è stato registrato a HackRome 24.', project: '', time: 'Ieri' },
    { type: 'update', user: 'System', text: 'Aggiornamento regole per Global AI Challenge.', project: '', time: '2 giorni fa' }
  ];

  private timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    // Simulazione semplice di un countdown per l'effetto visivo
    let seconds = 30;
    let minutes = 12;
    let hours = 48;

    this.timerInterval = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        minutes = 59;
        hours--;
      }
      // Formatta come HH : MM : SS
      this.activeHackathon.timeLeft = `${hours} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  acceptInvite() {
    console.log('Invito accettato');
    // Logica per accettare l'invito
  }

  declineInvite() {
    console.log('Invito rifiutato');
    // Logica per rifiutare l'invito
  }
}