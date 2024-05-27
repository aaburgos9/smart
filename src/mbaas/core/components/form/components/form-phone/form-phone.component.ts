import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicForm } from '../../models/dinamic-form.interface';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'mbaas-form-phone',
  templateUrl: './form-phone.component.html',
  styleUrls: ['./form-phone.component.scss']
})
export class FormPhoneComponent implements OnInit, Field, DynamicForm {

  public config: FieldConfig;
  public firstInputConfig: FieldConfig;
  public secondInputConfig: FieldConfig;
  public thirdInputConfig: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;

  public fieldValidity = false;
  public fieldValidityOne = false;
  public fieldValidityTwo = false;
  phoneFormGroup: FormGroup;
  private respaldo = '';

  constructor() { }

  ngOnInit() {
    const formControlName = this.config.name;
    this.phoneFormGroup = this.group.get(formControlName) as FormGroup;

    const children: FieldConfig[] = this.config.children;

    this.firstInputConfig = children[0];
    this.secondInputConfig = children[1];
    this.thirdInputConfig = children[2];

  }

  getFormGroup(): FormGroup {
    return this.phoneFormGroup;
  }


  validField(): boolean {
    return this.fieldValidity;
  }

  specialCharsPattern(event: any, onlyLetters= false, onlyNumbers= false): boolean {

    event.target.value = event.target.value === '' && this.respaldo.length > 1 ? this.respaldo : event.target.value;
    this.respaldo = event.target.value;
    const character = event.data ? event.data.slice(-1) : '';
    const key = event.data ? character.charCodeAt(0) : 8;
    let pattern = /[A-Za-z0-9]/;

    if (onlyLetters) {
      event.target.value = event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      pattern = /[A-Za-z]/;
    } else if (onlyNumbers) {
      pattern = /[0-9]/;
      // console.log ('>>>>>>>>>>>>>>>>>>>>', event.target.value);
    } else if (this.config.inputType === 'email') {
      pattern = /[A-Za-z0-9@&._-]/;
    }

    if (!pattern.test(character) && key !== 8 && key !== 32 && !isNaN(key)) {
      const clonEvent = { value: event.target.value };
      event.target.value = clonEvent.value.replace(character, '', 'g');
      if (this.config.failBorder) {
        this.fieldValidity = true;
        setTimeout(() => {
          this.fieldValidity = false;
        }, 2500);
      }
      return false;
    }
    if (this.config.failBorder) {
      this.fieldValidity = false;
    }
    return true;
  }

  validationField(name: string) {
    if (this.config.failBorder) {
      if (name === 'one') {
        this.fieldValidityOne = !this.group.get(this.config.name).get(this.firstInputConfig.name).valid;
      } else {
        this.fieldValidityTwo = !this.group.get(this.config.name).get(this.secondInputConfig.name).valid;
      }
    } else {
      this.fieldValidityOne = false;
      this.fieldValidityTwo = false;
    }
  }

}
