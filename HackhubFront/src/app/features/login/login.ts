import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  credentials = { username: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Salva il token ricevuto dal backend
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          // Se il backend restituisce anche username o ruolo, potresti salvarli
          if (response.username) {
            localStorage.setItem('username', response.username);
          }
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Login fallito: token non ricevuto.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login error', err);
        if (err.status === 401) {
          this.errorMessage = 'Credenziali non valide.';
        } else {
          this.errorMessage = 'Si è verificato un errore durante il login. Riprova più tardi.';
        }
        this.isLoading = false;
      }
    });
  }
}
