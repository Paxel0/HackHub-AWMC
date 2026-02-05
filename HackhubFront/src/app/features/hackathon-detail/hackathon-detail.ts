import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Hackathon } from '../../core/models/hackathon';
import { HackathonService } from '../../core/services/hackathon';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hackathonService: HackathonService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/explore-hackathons']);
      return;
    }

    this.hackathonService.getById(id).subscribe({
      next: (data) => {
        this.hackathon = data;
        this.checkRegistrationStatus(id);
      },
      error: () => this.router.navigate(['/explore-hackathons'])
    });
  }

  checkRegistrationStatus(id: number) {
    this.hackathonService.getMySubscription().subscribe({
      next: (subscribedHackathon) => {
        // Se c'è un hackathon e l'ID corrisponde, allora siamo iscritti
        this.isRegistered = !!subscribedHackathon && subscribedHackathon.id === id;
      },
      error: (err) => console.error('Error checking registration', err)
    });
  }

  toggleRegistration() {
    if (this.isLoading || !this.hackathon) return;
    
    this.isLoading = true;
    this.hackathonService.toggleSubscription(this.hackathon.id).subscribe({
      next: (result) => {
        // Se result è null, significa toggle off (disiscritto)
        // Se result è un oggetto, significa toggle on (iscritto)
        this.isRegistered = !!result;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Registration toggle failed', err);
        // Se errore 409 (Conflict), gestiscilo mostrando un messaggio all'utente o semplicemente logga
        if (err.status === 409) {
          alert('Sei già iscritto ad un altro hackathon!');
        }
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/explore-hackathons']);
  }
}
