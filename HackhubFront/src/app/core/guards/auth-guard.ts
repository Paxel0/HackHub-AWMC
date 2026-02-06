import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
// serve a impedire l'accesso ad altre sezioni private (dashboard, premi, impostazioni) se l'utente non è autenticato, cioè se non ha un token salvato
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  //  Controlla se c'è il token salvato
  const token = localStorage.getItem('authToken');

  if (token) {
    // Se il token c'è l'accesso è consentito
    return true;
  } else {
    // Se il token NON c'è, l'accesso è negato e l'utente viene reindirizzato alla pagina di login
    
    router.navigate(['/login']);
    return false;
  }
};