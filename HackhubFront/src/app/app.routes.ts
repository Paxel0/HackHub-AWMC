import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { TeamComponent } from './features/team/team';
import { ExploreHackathonsComponent } from './features/explore-hackathons/explore-hackathons';
import { PrizesComponent } from './features/prizes/prizes';
import { ProfileComponent } from './features/profile/profile';
import { SettingsComponent } from './features/settings/settings';

export const routes: Routes = [
  // Quando il percorso è vuoto, mostra la Home
  { path: '', component: HomeComponent },
 
  { path: 'dashboard', component: Dashboard },
  { path: 'team', component: TeamComponent },
  { path: 'explore-hackathons', component: ExploreHackathonsComponent },
  { path: 'prizes', component: PrizesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
 
  // Aggiunto percorso per la pagina di login
  { path: 'login', component: Login }
 
  
];
