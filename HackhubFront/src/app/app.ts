import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
import { Sidebar } from './shared/sidebar/sidebar';
import { Dashboard } from "./features/dashboard/dashboard";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    Sidebar,
    Dashboard
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FrontEnd');
  showSidebar = signal(false);
  showFooter = signal(true);

  constructor(private router: Router) {
    // Ascolta i cambiamenti di rotta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Mostra la sidebar solo nelle rotte che iniziano con /dashboard
      this.showSidebar.set(event.urlAfterRedirects.startsWith('/dashboard'));
      // Nascondi il footer nella login
      this.showFooter.set(!event.urlAfterRedirects.startsWith('/login'));
    });

    // Controlla la rotta iniziale
    this.showSidebar.set(this.router.url.startsWith('/dashboard'));
    this.showFooter.set(!this.router.url.startsWith('/login'));
  }
}
