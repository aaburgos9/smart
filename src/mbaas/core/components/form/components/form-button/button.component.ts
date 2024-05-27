import { Component, forwardRef, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const MBAAS_BUTTON_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonComponent),
  multi: true
};

@Component({
  selector: 'mbaas-field-button',
  templateUrl: './button.component.html',
  providers: [MBAAS_BUTTON_CONTROL_VALUE_ACCESSOR],
})
export class ButtonComponent implements ControlValueAccessor {
  @Input() content: string;
  @Input() classBtn: string;
  @Input() disabled = false;

  value: number;

  constructor(private zone: NgZone) {
    this.value = 0;
  }

  propagateChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value;
  }
  onChange(): void {
    this.zone.run(() => {
      this.propagateChange(this.value);
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  clickEvent() {
    this.value++;
    this.onChange();
  }
}
