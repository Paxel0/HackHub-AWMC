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

  constructor(private authService: AuthService, private router: Router) {}

 
onLogin() {
  this.authService.login(this.credentials).subscribe({
    next: (response) => {
      // 1. IMPLEMENTARE QUESTO: Salva il token
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      this.router.navigate(['/dashboard']);
    },
    error: (err) => { /* gestione errori */ }
  });
}

}
