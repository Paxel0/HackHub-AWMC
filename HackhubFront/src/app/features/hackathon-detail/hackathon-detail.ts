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
    this.hackathonService.isRegistered(id).subscribe({
      next: (status) => this.isRegistered = status,
      error: (err) => console.error('Error checking registration', err)
    });
  }

  register() {
    if (this.isLoading || this.isRegistered || !this.hackathon) return;
    
    this.isLoading = true;
    this.hackathonService.register(this.hackathon.id).subscribe({
      next: () => {
        this.isRegistered = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.isLoading = false;
      }
    });
  }

  cancelRegistration() {
    if (this.isLoading || !this.isRegistered || !this.hackathon) return;
    
    this.isLoading = true;
    this.hackathonService.cancelRegistration(this.hackathon.id).subscribe({
      next: () => {
        this.isRegistered = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Cancellation failed', err);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/explore-hackathons']);
  }
}
