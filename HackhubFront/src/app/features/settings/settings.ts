import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <section class="page-shell">
      <h1>Impostazioni</h1>
      <p>Configura notifiche, privacy e preferenze dell'account.</p>
    </section>
  `
})
export class SettingsComponent {}
