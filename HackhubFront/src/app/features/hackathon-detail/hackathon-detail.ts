import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hackathon } from '../../core/models/hackathon';

@Component({
  selector: 'app-hackathon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hackathon-detail.html',
  styleUrls: ['./hackathon-detail.scss']
})
export class HackathonDetailComponent implements OnInit {
  hackathon?: Hackathon;
  isRegistered = false;
  isLoading = false;

  // Dati mock (in futuro da service/API)
  private mockHackathons: Hackathon[] = [
    {
      id: 1,
      title: 'AI 2024',
      organizer: 'UNICAM INFORMATICA',
      startDate: '15 Ottobre',
      endDate: '18 Ottobre 2024',
      location: 'Online / Camerino',
      partecipanti: 1420,
      premio: '5000€',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      status: 'Aperto'
    },
    {
      id: 2,
      title: 'GreenTech Summit',
      organizer: 'ECOGLOBAL',
      startDate: '01 Novembre',
      endDate: '03 Novembre 2024',
      location: 'Rome, Italy',
      partecipanti: 350,
      premio: '400€',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      status: 'In corso'
    },
    {
      id: 3,
      title: 'CISCO',
      organizer: 'FAUSTO MARCANTONI',
      startDate: '10 Dicembre',
      endDate: '12 Dicembre 2024',
      location: 'Camerino',
      partecipanti: 800,
      premio: '30L',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      status: 'Aperto'
    },
    {
      id: 4,
      title: 'Health Data Sprint',
      organizer: 'MEDTECH INC',
      startDate: '20 Settembre',
      endDate: '22 Settembre 2024',
      location: 'Milano',
      partecipanti: 210,
      premio: '25,000€',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
      status: 'Chiuso'
    },
    {
      id: 5,
      title: 'Backend Builders',
      organizer: 'Bonura',
      startDate: '05 Gennaio',
      endDate: '10 Gennaio 2025',
      location: 'Online',
      partecipanti: 500,
      premio: '10,000€',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      status: 'Aperto'
    },
    {
      id: 6,
      title: 'VR/AR Creator Fest',
      organizer: 'METAVERSE CO',
      startDate: '15 Novembre',
      endDate: '20 Novembre 2024',
      location: 'Macerata',
      partecipanti: 300,
      premio: '75,000€',
      imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800',
      status: 'Aperto'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hackathon = this.mockHackathons.find(h => h.id === id);
    
    if (!this.hackathon) {
      // Reindirizza se non trovato
      this.router.navigate(['/explore-hackathons']);
    }
  }

  register() {
    if (this.isLoading || this.isRegistered) return;
    
    this.isLoading = true;
    // Simula chiamata API
    setTimeout(() => {
      this.isRegistered = true;
      this.isLoading = false;
      console.log('Iscritto all\'hackathon:', this.hackathon?.id);
      // TODO: chiamata al service: hackathonService.register(this.hackathon!.id)
    }, 500);
  }

  cancelRegistration() {
    if (this.isLoading || !this.isRegistered) return;
    
    this.isLoading = true;
    // Simula chiamata API
    setTimeout(() => {
      this.isRegistered = false;
      this.isLoading = false;
      console.log('Iscrizione annullata per hackathon:', this.hackathon?.id);
      // TODO: chiamata al service: hackathonService.cancelRegistration(this.hackathon!.id)
    }, 500);
  }

  goBack() {
    this.router.navigate(['/explore-hackathons']);
  }
}
