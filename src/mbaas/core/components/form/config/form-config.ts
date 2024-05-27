import { Type } from '@angular/core';
import { Field } from '../models/field.interface';
import { FormButtonComponent } from '../components/form-button/form-button.component';
import { FormInputComponent } from '../components/form-input/form-input.component';
import { FormSelectComponent } from '../components/form-select/form-select.component';
import { FormToggleComponent } from '../components/form-toggle/form-toggle.component';
import { FormRadioComponent } from '../components/form-radio/form-radio.component';
import { FormCheckComponent } from '../components/form-check/form-check.component';

import {FormAddresComponent} from '../components/form-addres/form-addres.component';
import {FormPhoneComponent} from '../components/form-phone/form-phone.component';
import { FormGroupCheckComponent } from '../components/form-group-check/form-group-check.component';
import { FormInputMoneyComponent } from '../components/form-input-money/form-input-money.component';
import { FormSliderComponent } from '../components/form-slider/form-slider.component';
import { FormCheckComponentOpts } from '../components/form-check-opts/form-check.-opts.component';
import { FormRecaptchaComponent } from '../components/form-recaptcha/form-recaptcha.component';
import { FormTextFieldComponent } from '../components/form-text-field/form-text-field.component';

/**
 * Definicion de los componentes que seran
 * renderizados de forma dinamica
 */
export const COMPONENTS: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent,
  toggle: FormToggleComponent,
  radioButton: FormRadioComponent,
  checkButton: FormCheckComponent,
  checkButtonOpts : FormCheckComponentOpts,
  formAddres: FormAddresComponent,
  formPhone: FormPhoneComponent,
  formGroupCheck: FormGroupCheckComponent,
  inputMoney: FormInputMoneyComponent,
  sliderInput: FormSliderComponent,
  recaptcha: FormRecaptchaComponent,
  textField: FormTextFieldComponent,
};


/**
 * Enumerador para seleccionar el componente
 * a renderizar desde el objeto de configuracion
 */
export enum FormTypes {
  button = 'button',
  input = 'input',
  select = 'select',
  date = 'date',
  predictiveList = 'predictiveList',
  toggle = 'toggle',
  threeLevel = 'threeLevel',
  radioButton = 'radioButton',
  checkButton = 'checkButton',
  checkButtonOpts = 'checkButtonOpts',
  formAddres = 'formAddres',
  formPhone = 'formPhone',
  formGroupCheck = 'formGroupCheck',
  inputMoney = 'inputMoney',
  sliderInput = 'sliderInput',
  formArray = 'formArray',
  calendar = 'inputCalendar',
  autocomplete = 'autocomplete',
  recaptcha= 'recaptcha',
  textField= 'textField',
}
