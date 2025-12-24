import { Component, OnInit, inject } from '@angular/core';
import { HackathonService, Hackathon } from '../../hackathon-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-find-hackathon',
  imports: [NgFor],
  templateUrl: './find-hackathon.html',
  styleUrl: './find-hackathon.scss',
})
export class FindHackathon implements OnInit {
  private service = inject(HackathonService);  // inietto il servizio che chiama le API del backend
  data: Hackathon[] = [];  // qui metterò la lista di hackathon ricevuta dal backend

  ngOnInit(): void {
    this.service.list().subscribe({
      next: (hackathons: Hackathon[]) => {
        this.data = hackathons;
      },
      error: (err: unknown) =>
        console.error('Errore nel caricamento hackathon', err),
    });
  }
}
