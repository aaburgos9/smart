import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[onlyLetters]'
})
export class OnlyLettersDirective {

  @Input('onlyLetters') soloLetras: boolean;
  chart: number;
  validator: boolean;

  constructor() { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.soloLetras) {
      this.chart = event.charCode;
      this.validator = (
        !(this.chart >= 48 && this.chart <= 57)
      );
      return this.validator;
    }
  }
}
