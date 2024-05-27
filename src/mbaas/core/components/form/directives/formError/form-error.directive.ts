import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  /* eslint-disable-next-line */
  selector: "[appFormError]"
})
export class FormErrorDirective {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('form') form: FormGroup;

  formName: string;
  addErrorClass: string;
  element: any;
  interval: any;
  constructor(private el: ElementRef) {
    if (!this.el) {
      return;
    }
    this.element = this.el;
    if (this.element.nativeElement.attributes.getNamedItem('formcontrolname')) {
      this.formName = this.element.nativeElement.attributes.getNamedItem(
        'formcontrolname'
      ).value;
    } else {
      this.formName = this.element.nativeElement.attributes.getNamedItem(
        'controlname'
      ).value;
    }
    this.addErrorClass = this.element.nativeElement.attributes.getNamedItem(
      'addErrorClass'
    ).value;
    this.interval = setInterval(() => this.setClass(), 150);
  }

  setClass(): void {
    this.getError()
      ? this.element.nativeElement.classList.add(this.addErrorClass)
      : this.element.nativeElement.classList.remove(this.addErrorClass);
  }

  public getError(): boolean {
    return (
      this.form.get(this.formName).errors &&
      (this.form.get(this.formName).dirty ||
        this.form.get(this.formName).touched)
    );
  }
}
