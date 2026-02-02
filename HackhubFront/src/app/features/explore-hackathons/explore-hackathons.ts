import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hackathon } from '../../core/models/hackathon';
import { HackathonService } from '../../core/services/hackathon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore-hackathons',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './explore-hackathons.html',
  styleUrls: ['./explore-hackathons.scss']
})
export class ExploreHackathonsComponent implements OnInit {
  searchTerm: string = '';
  allHackathons: Hackathon[] = [];
  filteredHackathons: Hackathon[] = [];

  constructor(private hackathonService: HackathonService) {}

  ngOnInit() {
    this.hackathonService.getAll().subscribe({
      next: (data) => {
        this.allHackathons = data;
        this.filteredHackathons = data;
      },
      error: (err) => console.error('Error fetching hackathons', err)
    });
  }

  filterHackathons() {
    if (!this.searchTerm) {
      this.filteredHackathons = this.allHackathons;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredHackathons = this.allHackathons.filter(h => 
      h.title.toLowerCase().includes(term) ||
      h.organizer.toLowerCase().includes(term) ||
      h.location.toLowerCase().includes(term)
    );
  }
}