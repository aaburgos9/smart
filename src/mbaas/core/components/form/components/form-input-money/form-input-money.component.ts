import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'mbaas-form-input',
  templateUrl: './form-input-money.component.html',
  styleUrls: ['form-input-money.component.scss']
})
export class FormInputMoneyComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  private dollars: boolean;
  private currencyPipe = new CurrencyPipe('en-USD');

  public fieldValidity = false;
  onInput: boolean;

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.dollars = this.config.dollars ? this.config.dollars : false;
    this.formControl = this.group.get(formControlName) as FormControl;
    this.formControl.setValue(this.config.value ? this.config.value : '');
    this.fieldValidity = false;
    this.formControl.valueChanges.subscribe(() => {
      this.onInput ? this.fieldValidity = this.formControl.invalid : this.fieldValidity = false;
    });
  }

  validField(): boolean {
    return this.fieldValidity;
  }

  editField(editable: boolean): void {
    if (editable) {
      this.config.disabled = false;
    }
  }

  setOnInput() {
    this.onInput = true;
  }

  changeMSK() {
    const value = this.formControl.value;
    if (value.length > 0) {
      const currency = value.toString().replace(/\$+|\.|\,/g, '');
      if (typeof currency === 'string') {
        const maskedVal = (this.dollars) ?
          this.currencyPipe.transform(currency).replace(/\$/g, '') :
          this.currencyPipe.transform(currency).replace(/,/g, '.');
        if (value !== maskedVal) {
          this.formControl.setValue(maskedVal.slice(0, -3));
        }
      }
    }
    this.onInput = false;
  }
}
