import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  // Quando il percorso è vuoto, mostra la Home
  { path: '', component: HomeComponent },
  // Altri percorsi (per ora lasciamoli stare)
  { path: 'find-hackathon', component: HomeComponent } 
];
