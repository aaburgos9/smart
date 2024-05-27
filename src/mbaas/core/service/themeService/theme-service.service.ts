import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addTheme(path: string): void {
    const head = this.document.head;
    let theme: HTMLLinkElement;
    head.querySelectorAll('link').forEach((el) => {
      if (el.id == 'theme') {
        theme = el;
      }
    });
    this.renderer?.setAttribute(theme, 'href', path);
  }

  removeTheme() {
    const head = this.document.head;
    let oldStyle: HTMLLinkElement;
    head.querySelectorAll('link').forEach((el) => {
      if (el.rel == 'stylesheet') {
        oldStyle = el;
      }
    });
    this.renderer.removeChild(head, oldStyle);
  }
}
