import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
 standalone: true,
  imports: [RouterLink, RouterLinkActive], // Importante per far funzionare i link
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {}