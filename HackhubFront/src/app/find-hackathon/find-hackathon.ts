import { Component, OnInit, inject } from '@angular/core';
import { HackathonService, Hackathon } from '../hackathon-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-find-hackathon',
  imports: [NgFor],
  templateUrl: './find-hackathon.html',
  styleUrl: './find-hackathon.scss',
})
export class FindHackathon implements OnInit {
  private service = inject(HackathonService);  // inietto il servizio che chiama le API del backend
  data: string[] = [];  // qui metterò la lista di hackathon ricevuta dal backend

  ngOnInit(): void {
    this.service.list().subscribe({
      next: (raw: string) => {
        this.data = raw
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
      },
      error: (err: unknown) =>
        console.error('Errore nel caricamento hackathon', err),
    });
}
}
