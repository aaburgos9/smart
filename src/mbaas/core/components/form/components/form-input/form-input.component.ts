import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'mbaas-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['form-input.component.scss']
})
export class FormInputComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;

  public fieldValidity = false;
  estateInput = false;
  public taggingValue = '';

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
    this.formControl.setValue(this.config.value ? this.config.value : '');
    this.formControl.valueChanges.subscribe(() => {
      this.fieldValidity = this.formControl.invalid;
      this.taggingValue = this.formControl.value;
    });
  }

  specialCharsPattern(event: any, onlyLetters: boolean, onlyNumbers: boolean) {
    if (onlyLetters) {
      return this.validOnlyLetters(event);
    }

    if (onlyNumbers) {
      this.validOnlyNumbers(event);
    }

    if (this.config.inputType === 'email') {
      this.validEmail(event);
    }

  }

  validEmail(event: any) {
    const pattern = /[A-Za-z0-9@&._-]/;
    return this.replaceValues(pattern, event);
  }

  validOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    return this.replaceValues(pattern, event);

  }

  validOnlyLetters(event: any) {
    const pattern = /[A-Z]/;
    return this.replaceValues(pattern, event);

  }

  replaceValues(pattern: any, event: any): boolean {
    if (!pattern.test(event.data)) {
      const clonEvent = { value: event.target.value };
      event.target.value = clonEvent.value.replace(event.data, '', 'g');
      if (this.config.failBorder) {
        this.fieldValidity = true;
      }
      return false;
    }
    return true;
  }


  validField(): boolean {
    if (this.config.failBorder && this.estateInput) {
      return this.fieldValidity;
    }
    return false;
  }

  editField(editable: boolean): void {
    if (editable) {
      this.config.disabled = false;
      this.config.readonly = false;
    }
  }

  inputState(): void {
    this.estateInput = true;
  }
}
