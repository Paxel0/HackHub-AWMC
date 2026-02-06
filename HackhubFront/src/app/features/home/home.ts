import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hackathon } from '../../core/models/hackathon';
import { HackathonService } from '../../core/services/hackathon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  filteredHackathons: Hackathon[] = [];
  hackathons: Hackathon[] = [];

  constructor(private hackathonService: HackathonService) {}

  ngOnInit() {
    this.hackathonService.getAll().subscribe({
      next: (data) => {
        this.hackathons = data;
        this.filteredHackathons = data;
      },
      error: (err) => console.error('Error fetching hackathons', err)
    });
  }

  filterHackathons() {
    if (!this.searchTerm) {
      this.filteredHackathons = this.hackathons;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredHackathons = this.hackathons.filter(h => 
      h.name.toLowerCase().includes(term) ||
      h.creator.toLowerCase().includes(term) ||
      h.location.toLowerCase().includes(term)
    );
  }
}