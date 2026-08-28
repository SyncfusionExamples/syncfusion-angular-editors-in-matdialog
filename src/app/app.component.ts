import { Component, OnInit } from '@angular/core';
import { registerLicense } from '@syncfusion/ej2-base';
import { HomeComponent } from './components/home/home.component';
import { environment } from '../environments/environment';

/**
 * Root shell component for the document editor sample.
 * Hosts the home page and registers the Syncfusion license on bootstrap.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  template: `
    <app-home></app-home>
  `
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Register Syncfusion license if a key is provided. Otherwise the Community
    // license is honored automatically. Replace environment.syncfusionLicenseKey
    // with your own key in production.
    if (environment.syncfusionLicenseKey) {
      registerLicense(environment.syncfusionLicenseKey);
    }
  }
}