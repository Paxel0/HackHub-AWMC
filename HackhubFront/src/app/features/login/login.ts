import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class Login {
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login effettuato!', response);
        // Salva il token se presente (es. localStorage.setItem('token', response.token))
        this.router.navigate(['/dashboard']); // Naviga verso una pagina protetta
      },
      error: (err) => {
        this.errorMessage = 'Credenziali non valide o errore di server';
        console.error(err);
      }
    });
  }
}
