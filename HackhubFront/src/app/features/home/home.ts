import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hackathon } from '../../core/models/hackathon';
// Importiamo il tuo footer dalla cartella shared
import { FooterComponent } from '../../shared/footer/footer'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterLink, FormsModule], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  filteredHackathons: Hackathon[] = [];

  hackathons: Hackathon[] = [
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

  ngOnInit() {
    this.filteredHackathons = this.hackathons;
  }

  filterHackathons() {
    if (!this.searchTerm) {
      this.filteredHackathons = this.hackathons;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredHackathons = this.hackathons.filter(h => 
      h.title.toLowerCase().includes(term) ||
      h.organizer.toLowerCase().includes(term) ||
      h.location.toLowerCase().includes(term)
    );
  }
}