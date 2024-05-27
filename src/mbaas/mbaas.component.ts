import { Component, ElementRef, Renderer2 } from '@angular/core';
import { fadeAnimation } from './mbaas.outlet';
import { environment } from 'src/environments/environment';

declare const setGoogleTagManager: any;

@Component({
  selector: 'mbaas-root',
  templateUrl: './mbaas.component.html',
  styleUrls: ['./mbaas.component.scss'],
  animations: [fadeAnimation],
})
export class MbaasComponent {
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {
    setGoogleTagManager(environment.idTagging);
    // Insertar iframe para google tag manager
    // Se realiza la inserción de elementos como lo sugiere google
    // 1. iframe dentro de un noscript
    // 2. el noscript con iframe al inicio del body
    const noscript = this.renderer.createElement('noscript');
    const iframe = this.renderer.createElement('iframe');
    iframe.style = 'display:none;visibility:hidden;height:0;width:0';
    iframe.src = `${environment.urlTagging}${environment.idTagging}`;
    this.renderer.appendChild(noscript, iframe);
    this.renderer.insertBefore(
      document.body,
      noscript,
      this.elRef.nativeElement
    );
  }

  moveScroll(): void {
    window.scroll(0, 0);
  }
}
