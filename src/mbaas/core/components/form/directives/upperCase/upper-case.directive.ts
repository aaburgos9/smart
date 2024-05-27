import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[upperCase]'
})
export class UpperCaseDirective {

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('upperCase') mayusculas: boolean;
  element: any;

  constructor(
    public el: ElementRef
  ) {
    this.element = el;
  }

  @HostListener('input') onInput() {
    if (this.mayusculas) {
      return this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    }
  }

}
