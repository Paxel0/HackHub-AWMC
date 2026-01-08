import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  menuItems = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'Il mio team', icon: 'bi-trophy', route: '/dashboard/team' },
    { label: 'Esplora Hackathon', icon: 'bi-compass', route: '/dashboard/explore-hackathons' },
    { label: 'I miei premi', icon: 'bi-people', route: '/dashboard/prizes' },
    { label: 'Profilo', icon: 'bi-person-circle', route: '/dashboard/profile' },
    { label: 'Impostazioni', icon: 'bi-gear', route: '/dashboard/settings' }
  ];
}
