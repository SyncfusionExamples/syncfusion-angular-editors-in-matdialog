import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    {     
      provide: OVERLAY_DEFAULT_CONFIG,
      useValue: { usePopover: false }
    }
  ]
}).catch((x) => console.error(x));