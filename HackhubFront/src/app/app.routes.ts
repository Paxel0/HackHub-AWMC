import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  // Quando il percorso è vuoto, mostra la Home
  { path: '', component: HomeComponent },
 
  { path: 'dashboard', component: Dashboard },
 
  // Aggiunto percorso per la pagina di login
  { path: 'login', component: Login }
 
  
];
