import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { TeamComponent } from './features/team/team';
import { ExploreHackathonsComponent } from './features/explore-hackathons/explore-hackathons';
import { HackathonDetailComponent } from './features/hackathon-detail/hackathon-detail';
import { PrizesComponent } from './features/prizes/prizes';
import { ProfileComponent } from './features/profile/profile';
import { SettingsComponent } from './features/settings/settings';
import { authGuard } from './core/guards/auth-guard'; // Importa guards

export const routes: Routes = [
  // se il  percorso è vuoto, mostra la Home
  { path: '', component: HomeComponent },
 
  { path: 'dashboard', component: Dashboard , canActivate: [authGuard] },
  { path: 'team', component: TeamComponent, canActivate: [authGuard] },
  { path: 'explore-hackathons', component: ExploreHackathonsComponent , canActivate: [authGuard] },
  { path: 'explore-hackathons/:id', component: HackathonDetailComponent , canActivate: [authGuard] },
  { path: 'prizes', component: PrizesComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
 
  //  percorso per la pagina di login
  { path: 'login', component: Login }
 
  
];
