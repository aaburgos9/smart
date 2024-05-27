import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MbaasModule } from './mbaas/mbaas.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (!environment.logger) {
  window.console.log = () => {};
  window.console.warn = () => {};
}

declare global {
  interface Window {
    dataLayer: any;
  }
}

platformBrowserDynamic().bootstrapModule(MbaasModule)
  .catch(err => console.error(err));
