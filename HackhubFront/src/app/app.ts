import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
import { Sidebar, SIDEBAR_ROUTES } from './shared/sidebar/sidebar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    Sidebar
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FrontEnd');
  showSidebar = signal(false);
  showFooter = signal(true);

  constructor(private router: Router) {
    // segui i cambiamenti di rotta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateLayoutFlags(event.urlAfterRedirects);
    });

    // Controlla la rotta iniziale
    this.updateLayoutFlags(this.router.url);
  }

  private updateLayoutFlags(url: string) {
    const isSidebarRoute = SIDEBAR_ROUTES.some(route => url.startsWith(route));
    this.showSidebar.set(isSidebarRoute);
    this.showFooter.set(!url.startsWith('/login'));
  }
}
