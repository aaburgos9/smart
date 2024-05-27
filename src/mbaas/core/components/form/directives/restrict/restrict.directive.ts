import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ccRestrict]'
})
export class RestrictDirective {

  @Input('ccRestrict') filtro = '';
  element: any;

  constructor(
    public el: ElementRef
  ) {
    this.element = el;
  }

  @HostListener('input') onInput() {
    if (this.element.nativeElement.selectionStart) {
      const initial = { init: this.element.nativeElement.selectionStart };
      this.element.nativeElement.value = this.filter(this.element.nativeElement.value, this.filtro);
      setTimeout(() => {
        this.element.nativeElement.selectionStart = initial.init;
        this.element.nativeElement.selectionEnd = initial.init;
      }, 30);
    }
  }


  filter( cadena: string, filtro: string ): string {
    let out = '';
    for ( let i = 0; i < cadena.length; i++) {
      if (filtro.indexOf(cadena.charAt(i)) !== -1) {
        out += cadena.charAt(i);
      }
    }
    return out;
  }

}
