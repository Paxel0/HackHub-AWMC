import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Login } from './features/login/login';

export const routes: Routes = [
  // Quando il percorso è vuoto, mostra la Home
  { path: '', component: HomeComponent },
  // Altri percorsi (per ora lasciamoli stare)
  { path: 'find-hackathon', component: HomeComponent }, 
  { path: 'login', component: Login } // Aggiunto percorso per la pagina di login
];
