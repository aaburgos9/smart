import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[specialChart]'
})
export class SpecialChartDirective {

  @Input('specialChart') caracteresEspeciales: boolean;
  chart: number;
  validator: boolean;

  constructor() {}

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.caracteresEspeciales) {
      this.chart = event.charCode;
      this.validator = (
        (this.chart > 64 && this.chart < 91) ||
        (this.chart > 96 && this.chart < 123) ||
        this.chart === 8 || this.chart === 32  ||
        (this.chart >= 48 && this.chart <= 57)
      );

      if (this.chart === 209 || this.chart === 241) {
        setTimeout(() => {
          event.target.value += 'N';
        }, 4);
      }

      return this.validator;
    }
  }
}
