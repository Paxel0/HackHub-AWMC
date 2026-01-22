import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Controlla se c'è il token salvato
  const token = localStorage.getItem('authToken');

  if (token) {
    // Se il token c'è, la guardia alza la sbarra: PUOI PASSARE
    return true;
  } else {
    // Se il token NON c'è, la guardia ti ferma
    // e ti rispedisce alla pagina di login (o home)
    router.navigate(['/login']);
    return false;
  }
};