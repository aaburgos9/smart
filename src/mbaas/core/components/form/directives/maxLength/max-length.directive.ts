import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ccMaxLength]'
})
export class MaxLengthDirective {

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('form') formulario: FormGroup;
  @Input('ccMaxLength') max = 0;
  element: any;

  constructor(
    public el: ElementRef
  ) {
    this.element = el;
  }

  @HostListener('input') onInput() {

    const controlName = this.element.nativeElement.attributes.getNamedItem('name').value;

    this.formulario.get(controlName).setValue(
      this.maxFilter(this.element.nativeElement.value, this.max)
    );
    this.element.nativeElement.value = this.maxFilter(this.element.nativeElement.value, this.max);
  }

  maxFilter( cadena: string, max: number ): string {
    if ( cadena.length <= max ) {
      return cadena;
    }
    return cadena.substring(0, max);
  }
}
