import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

export const SIDEBAR_MENU_ITEMS = [
  { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
  { label: 'Il mio team', icon: 'bi-trophy', route: '/team' },
  { label: 'Esplora Hackathon', icon: 'bi-compass', route: '/explore-hackathons' },
  { label: 'I miei premi', icon: 'bi-people', route: '/prizes' },
  { label: 'Profilo', icon: 'bi-person-circle', route: '/profile' },
  { label: 'Impostazioni', icon: 'bi-gear', route: '/settings' }
] as const;

export const SIDEBAR_ROUTES = SIDEBAR_MENU_ITEMS.map(item => item.route);

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  menuItems = SIDEBAR_MENU_ITEMS;
}
