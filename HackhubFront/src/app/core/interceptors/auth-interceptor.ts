import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Non aggiungere il token se è una richiesta di login o registrazione
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  // Recupera il token salvato
  const token = localStorage.getItem('authToken');

  // Se c'è un token, clona la richiesta e aggiungi l'header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // Se non c'è token, manda la richiesta così com'è
  return next(req);
};