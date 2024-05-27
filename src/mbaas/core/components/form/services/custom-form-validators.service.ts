import { Injectable } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isAfter, isBefore } from 'date-fns';
import date from 'date-and-time';
import { ErrorTypes } from '../types/validators-error.type';

@Injectable({
  providedIn: 'root'
})
export class CustomFormValidatorsService {

  constructor() { }

  email(): ValidatorFn {
    // eslint-disable-next-line max-len
    const emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return Validators.pattern(emailPattern);
  }

  nullValidator(): ValidatorFn {
    return Validators.nullValidator;
  }

  onlyNumbers(): ValidatorFn {
    const numberPattern = '^([1234567890])*$;';
    return Validators.pattern(numberPattern);
  }

  required(): ValidatorFn {
    return Validators.required;
  }

  requiredTrue(): ValidatorFn {
    return Validators.requiredTrue;
  }

  maxLength(max: number): ValidatorFn {
    return Validators.maxLength(max);
  }

  validationWithCallBack(errorKey: string, callback: (value: FormGroup) => boolean): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const validationErrors: ValidationErrors = {};
      validationErrors[errorKey] = true;

      if (!control.parent) {
        return validationErrors;
      }
      if (callback(control)) {
        return null;
      }

      return validationErrors;
    };
  }

  maxNumber(max: number, callback: (value: FormGroup) => boolean = (value: FormGroup) => false): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const errorKey = ErrorTypes.maxNumber;
      const validationErrors = this.validationWithCallBack(errorKey, callback);

      return (validationErrors && control.value < max) ? validationErrors : null;
    };
  }

  minNumber(min: number, callback: (value: FormGroup) => boolean = (value: FormGroup) => false): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const errorKey = ErrorTypes.minNumber;
      const validationErrors = this.validationWithCallBack(errorKey, callback);

      return (validationErrors && control.value > min) ? validationErrors : null;
    };
  }


  phoneNumber3Fields(key: string): Validators {

    return (control: FormGroup): ValidationErrors | null => {

      const validationErrors: ValidationErrors = {};
      validationErrors[key] = true;
      if (control.get('actividadLaboral').value === 'A'
        || control.get('actividadLaboral').value === 'P'
        || control.get('actividadLaboral').value === 'T') {

        return null;
      }

      if (control.get('indicativo').value && control.get('telefono').value) {
        return null;
      }

      if (!control.get('indicativo').value && !control.get('telefono').value && !control.get('extencion').value) {
        return null;
      }

      return validationErrors;
    };
  }

  validationWithArrayCallBack(key: string, done: Array<(value: FormGroup) => boolean>): Validators {
    return (control: FormGroup): ValidationErrors | null => {
      const obj = {};
      obj[key] = true;
      if (!control.parent) {
        return obj;
      }
      const results = done.map(
        item => item(control)
      );
      return results.reduce((itemA, itemB) => itemA && itemB, true) ? null : obj;
    };
  }

  minLength(min: number): ValidatorFn {
    return Validators.minLength(min);
  }

  pattern(pattern: string | RegExp): ValidatorFn {
    return Validators.pattern(pattern);
  }

  claveVirtual(field1: string, field3: string): ValidatorFn {
    const obj = {};
    obj[field3] = true;

    return (control: FormGroup): ValidationErrors | null => {

      const str = control.get(field1).value;
      // eslint-disable-next-line max-len
      const pattern = /(0123|1234|2345|3456|4567|5678|6789|7890|3210|4321|5432|6543|7654|8765|9876|0987|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)/i;
      const n = str.search(pattern);

      return (n === -1) ? null : obj;
    };
  }

  validationForValue(field1: string, value1: string, field2: string, field3: string): ValidatorFn {
    const obj = {};
    obj[field3] = true;
    return (control: FormGroup): ValidationErrors | null => {
      const fieldUno = control.get(field1).value;
      if (fieldUno === value1) {
        const fieldDos = control.get(field2).value;
        if (fieldDos === '') {
          return obj;
        }
        return null;
      }
      return null;
    };
  }

  select(valores: () => any[], callback: (control: FormGroup) => boolean = (control: FormGroup) => true): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (callback(control)) {
        return null;
      }

      const dataFiltered = valores().filter(item => item.value === control.value);

      return dataFiltered.length >= 1 ? null : { select: true };
    };
  }

  SelectMultiple(valores: () => any[], required: (control: FormGroup) => boolean = (control: FormGroup) => true): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (required(control)) {
        return null;
      }

      const dataFiltered = valores().filter(
        item => (control.value as Array<string>).filter(data => item.value === data).length !== 0
      );

      return dataFiltered.length !== 0 ? null : { select: true };
    };
  }

  minDate(fecha: string | number, type?: 'year' | 'month' | 'day'): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const errorKey = ErrorTypes.minDate;
      const validationErrors: ValidationErrors = {};

      if (!control.parent) {
        validationErrors[errorKey] = true;
        return validationErrors;
      }

      const dateFromControl = new Date(control.value);

      if (typeof (fecha) === 'number') {

        switch (type) {
          case 'year':
            if (isAfter(date.addYears(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;

          case 'month':
            if (isAfter(date.addMonths(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;

          case 'day':
            if (isAfter(date.addDays(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;
        }

      }

      if (typeof (fecha) === 'string') {
        if (isAfter(new Date(fecha), dateFromControl)) {
          validationErrors[errorKey] = true;
          return validationErrors;
        }
      }

      return null;
    };
  }

  maxDate(fecha: string | number, type: 'year' | 'month' | 'day' = 'day'): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      const errorKey = ErrorTypes.maxDate;
      const validationErrors: ValidationErrors = {};

      if (!control.parent) {
        validationErrors[errorKey] = true;
        return validationErrors;
      }

      const dateFromControl = new Date(control.value);

      if (typeof (fecha) === 'number') {

        switch (type) {
          case 'year':
            if (isBefore(date.addYears(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;

          case 'month':
            if (isBefore(date.addMonths(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;

          case 'day':
            if (isBefore(date.addDays(new Date(), fecha), dateFromControl)) {
              validationErrors[errorKey] = true;
              return validationErrors;
            }
            break;
        }

      }

      if (typeof (fecha) === 'string') {
        if (isBefore(new Date(fecha), dateFromControl)) {
          validationErrors[errorKey] = true;
          return validationErrors;
        }
      }

      return null;
    };
  }

  isContentInArray(field1: string, map: (pais: string) => boolean, field3: string): ValidatorFn {
    const obj = {};
    obj[field3] = true;
    return (control: FormGroup): ValidationErrors | null => {
      const str = control.get(field1).value;
      if (map(str)) {
        return null;
      }
      return obj;
    };
  }

  isContentInArrayWithValue(field1: string, field2: string, value: string, map: (pais: string) => boolean, field3: string): ValidatorFn {
    const obj = {};
    obj[field3] = true;
    return (control: FormGroup): ValidationErrors | null => {
      const campo2 = control.get(field2).value;
      if (campo2 !== value) {
        return null;
      }
      const str = control.get(field1).value;
      if (map(str)) {
        return null;
      }
      return obj;
    };
  }

  resetMyCallbackValidation(fields: Array<string>): Validators | ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      fields.forEach(item => {
        control.parent.get(item).setValue(control.parent.get(item).value);
      });
      return null;
    };
  }

  resetMyCallbackValidationArray(campo: string, fields: Array<string>): Validators | ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      (control.parent.get(campo) as FormArray).controls.forEach(
        itemArr => {
          fields.map(item => {

            itemArr.get(item).setValue(itemArr.get(item).value);
          });
        }
      );
      return null;
    };
  }

  minDateGroup(
    fecha: string | number,
    type?: 'year' | 'month' | 'day',
    requerida: (control: FormGroup) => boolean = (control) => true
  ): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {

      if (!requerida(control)) {
        return null;
      }
      if (!control.parent) {
        return { minDate: true };
      }

      const myDate = new Date(`${control.get('mes').value}/${control.get('dia').value}/${control.get('anio').value || 'X'}`);
      if (myDate.toString() === 'Invalid Date') {
        return { invalid: true };
      }
      // validar , en pruebas no se consigue error
      // if (myDate.getDate() !== parseInt(control.get('dia').value, 10)) {
      //   return { invalid: true };
      // }
      if (typeof (fecha) === 'number') {
        if (type === 'year') {
          if (isAfter(date.addYears(new Date(), fecha), myDate)) {
            return { minDate: true };
          }
        }
        if (type === 'month') {
          if (isAfter(date.addMonths(new Date(), fecha), myDate)) {
            return { minDate: true };
          }
        }
        if (type === 'day') {
          if (isAfter(date.addDays(new Date(), fecha), myDate)) {
            return { minDate: true };
          }
        }
      }
      if (typeof (fecha) === 'string') {
        if (isAfter(new Date(fecha), myDate)) {
          return { minDate: true };
        }
      }
      return null;
    };
  }

  maxDateGroup(
    fecha: string | number,
    type: 'year' | 'month' | 'day' = 'day',
    requerida: (control: FormGroup) => boolean = (control) => true
  ): ValidatorFn {
    console.log(fecha);
    return (control: FormGroup): ValidationErrors | null => {
      if (!requerida(control)) {
        return null;
      }
      if (!control.parent) {
        return { maxDate: true };
      }
      const myDate = new Date(`${control.get('mes').value}/${control.get('dia').value}/${control.get('anio').value || 'X'}`);
      if (myDate.toString() === 'Invalid Date') {
        return { invalid: true };
      }
      if (typeof (fecha) === 'number') {
        if (type === 'year') {
          if (isBefore(date.addYears(new Date(), fecha), myDate)) {
            return { maxDate: true };
          }
        }
        if (type === 'month') {
          if (isBefore(date.addMonths(new Date(), fecha), myDate)) {
            return { maxDate: true };
          }
        }
        if (type === 'day') {
          if (isBefore(date.addDays(new Date(), fecha), myDate)) {
            return { maxDate: true };
          }
        }
      }
      if (typeof (fecha) === 'string') {
        if (isBefore(new Date(fecha), myDate)) {
          return { maxDate: true };
        }
      }
      return null;
    };
  }

  parseToIntMoney(value: any) {
    let moneyFinal: any = '';
    if (value) {
      const money = value.split('$');
      if (money.length >= 2) {
        const moneyDecimal = (money[1].search(',') !== -1) ? money[1].split(',') : money[1].split('.');
        moneyDecimal.forEach(element => {
          moneyFinal += element;
        });
        // moneyFinal = moneyFinal.split(' ')[1];
      } else {
        moneyFinal = money[1];
      }
    }
    return moneyFinal;
  }

  validationMinCurrValue(min: any = 9999, cero: boolean = false): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      let str = control.value;
      (str.indexOf('$') !== -1) ? str = str : str = '$' + str;
      str = str ? str.indexOf('$') !== -1 ? this.parseToIntMoney(str) : str : 0;
      switch (cero) {
        case true:
          if (Number(str) > min || Number(str) === 0) {
            return null;
          } else {
            return { minValue: true };
          }
        default:
          if (Number(str) > min) {
            return null;
          } else {
            return { minValue: true };
          }
      }
    };
  }

  validationMaxCurrValue(max: any = 9999, cero: boolean = false): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      let str = control.value;
      (str.indexOf('$') !== -1) ? str = str : str = '$' + str;
      str = str ? str.indexOf('$') !== -1 ? this.parseToIntMoney(str) : str : 0;
      switch (cero) {
        case true:
          if (Number(str) < max || Number(str) === 0) {
            return null;
          } else {
            return { maxValue: true };
          }
        default:
          if (Number(str) < max && Number(str) > 0) {
            return null;
          } else {
            return { maxValue: true };
          }
      }
    };
  }

}
