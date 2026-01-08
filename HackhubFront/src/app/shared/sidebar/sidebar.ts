import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Metodo per gestire il toggle dei menu a tendina (dropdown)
  toggleGroup(event: Event) {
    event.preventDefault();
    const element = event.currentTarget as HTMLElement;
    const parent = element.parentElement;
    
    if (parent?.classList.contains('nav-group')) {
      parent.classList.toggle('show');
    }
  } 

  // Metodo per il pulsante di chiusura sidebar (mobile)
  toggleSidebar() {
    document.body.classList.toggle('sidebar-show');
  }
}
