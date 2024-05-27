import { TestBed } from '@angular/core/testing';
import { CustomFormValidatorsService } from './custom-form-validators.service';
import { FormGroup, ValidatorFn, Validators, FormControl, FormBuilder } from '@angular/forms';

describe('CustomFormValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service).toBeTruthy();
  });

  it('test for email', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.email()).toBeTruthy();
  });

  it('test for nullValidator', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.nullValidator()).toBeTruthy();
  });

  it('test for onlyNumbers', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.onlyNumbers()).toBeTruthy();
  });

  it('test for required', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.required()).toBeTruthy();
  });

  it('test for requiredTrue', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.requiredTrue()).toBeTruthy();
  });

  it('test for maxLength', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.maxLength(2)).toBeTruthy();
  });

  it('test form validationWithCallBack if', async () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'test' }), parent: true } as unknown);
    const funct = (service.validationWithCallBack('notFount', (controls: FormGroup) => {
      return true;
    }) as ValidatorFn);
    funct(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test form validationWithCallBack else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'test' }), parent: true } as unknown);
    const funct = (service.validationWithCallBack('notFounttwo', (controls: FormGroup) => {
      return null;
    }) as ValidatorFn);
    funct(control as FormGroup);
    expect(funct(control as FormGroup)).toBeTruthy();
  });

  it('test form validationWithCallBack else two', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({} as FormGroup);
    const funct = (service.validationWithCallBack('notFount', (controls: FormGroup) => {
      return null;
    }) as ValidatorFn);
    funct(control);
    expect(funct(control)).toBeTruthy();
  });

  it('test for maxNumber', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const funct = (service.maxNumber(10, (controls: FormGroup) => {
      return true;
    }) as ValidatorFn);
    const control = ({ get: (name: any) => ({ setValue: (i) => { } }), parent: true, value: 2 } as unknown);
    expect(funct(control as FormGroup)).toBeTruthy();
  });

  it('test for maxNumber false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { } }), parent: true, value: 10 } as unknown);
    const funct = (service.maxNumber(10, undefined) as ValidatorFn);
    funct(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minNumber', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const funct = (service.minNumber(10, undefined) as ValidatorFn);
    const control = ({ get: (name: any) => ({ setValue: (i) => { } }), parent: true, value: 2 } as unknown);
    funct(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minNumber false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { } }), parent: true, value: 10 } as unknown);
    const funct = (service.minNumber(1, (controls: FormGroup) => {
      return (false);
    }) as ValidatorFn);
    expect(funct(control as FormGroup)).toBeTruthy();
  });

  it('test for phoneNumber3Fields VALID actividadLaboral', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = service.phoneNumber3Fields('test');
    const control: any = {
      get: (name: any) => {
        const controls = [{
          name: 'actividadLaboral',
          setValue: (param2: any) => { },
          value: 'A'
        }];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2: any) => { },
    };
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for phoneNumber3Fields VALID indicativo, telefono', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = service.phoneNumber3Fields('test');
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'actividadLaboral',
            setValue: (param2: any) => { },
            value: 'any'
          }, {
            name: 'indicativo',
            setValue: (param2: any) => { },
            value: 'indicative'
          },
          {
            name: 'telefono',
            setValue: (param2: any) => { },
            value: 'phone '
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for phoneNumber3Fields VALID indicativo, telefono else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = service.phoneNumber3Fields('test');
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'actividadLaboral',
            setValue: (param2: any) => { },
            value: 'any'
          }, {
            name: 'indicativo',
            setValue: (param2: any) => { },
            value: undefined
          },
          {
            name: 'telefono',
            setValue: (param2: any) => { },
            value: undefined
          },
          {
            name: 'extencion',
            setValue: (param2: any) => { },
            value: 'extention'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for phoneNumber3Fields VALID indicativo, telefono , exencion', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = service.phoneNumber3Fields('test');
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'actividadLaboral',
            setValue: (param2: any) => { },
            value: 'any'
          }, {
            name: 'indicativo',
            setValue: (param2: any) => { },
            value: 'indicative'
          },
          {
            name: 'telefono',
            setValue: (param2: any) => { },
            value: 'phone '
          },
          {
            name: 'extencion',
            setValue: (param2: any) => { },
            value: 'extention'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for phoneNumber3Fields VALID indicativo, telefono , exencion IF', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = service.phoneNumber3Fields('test');
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'actividadLaboral',
            setValue: (param2: any) => { },
            value: 'any'
          }, {
            name: 'indicativo',
            setValue: (param2: any) => { },
            value: undefined
          },
          {
            name: 'telefono',
            setValue: (param2: any) => { },
            value: undefined
          },
          {
            name: 'extencion',
            setValue: (param2: any) => { },
            value: undefined
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for validationWithArrayCallBack', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = (service.validationWithArrayCallBack('testing', Array<(value: FormGroup) => true>()));
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'test' }), parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for validationWithArrayCallBack parent false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func: any = (service.validationWithArrayCallBack('testing', Array<(value: FormGroup) => true>(2)));
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'test' }), parent: false } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minLength', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.minLength(2)).toBeTruthy();
  });

  it('test for pattern', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    expect(service.pattern('2')).toBeTruthy();
  });

  it('test for claveVirtual', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.claveVirtual('uno', 'dos');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'test' }), parent: false } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for claveVirtual false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.claveVirtual('uno', 'dos');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '12345678' }), parent: false } as unknown);
    expect(func(control as FormGroup)).toBeTruthy();
  });

  it('test for validationForValue', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '12345678' }), parent: false } as unknown);
    const func = service.validationForValue('uno', 'dos', 'tres', 'cuatro');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for validationForValue  field1', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'uno',
            setValue: (param2: any) => { },
            value: 'unoval'
          }, {
            name: 'dos',
            setValue: (param2: any) => { },
            value: ''
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    const func = service.validationForValue('uno', 'unoval', 'dos', 'dosval');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for validationForValue  field1 else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'uno',
            setValue: (param2: any) => { },
            value: 'unoval'
          }, {
            name: 'dos',
            setValue: (param2: any) => { },
            value: 'dosval'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    const func = service.validationForValue('uno', 'unoval', 'dos', 'dosval');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for select', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '12345678' }), parent: false } as unknown);
    const func = service.select(() => [{ value: '1' }, { value: '2' }], (controls: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for select callback false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), parent: false } as unknown);
    const func = service.select(() => [{ value: '1' }, { value: '2' }], (controls: FormGroup) => null);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for select callback only one param', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), parent: false } as unknown);
    const func = service.select(() => [{ value: '1' }, { value: '2' }]);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for select callback null', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    const func = service.select(() => [{ value: '1' }], (controls: FormGroup) => null);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for SelectMultiple only one param', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.SelectMultiple(() => [{ value: '1' }, { value: '2' }]);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: ['1', '2'] }), value: ['1', '2'], parent: false } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for SelectMultiple two param', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.SelectMultiple(() => [{ value: '1' }, { value: '2' }], (controls: FormGroup) => false);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: ['1', '2'] }), value: ['1', '2'], parent: false } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for SelectMultiple only one param else return', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.SelectMultiple(() => [{ value: '3' }, { value: '4' }], (controls: FormGroup) => false);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: ['1', '2'] }), value: ['1', '2'], parent: false } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for SelectMultiple requiered false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.SelectMultiple(() => [{ value: '4' }, { value: '2' }]);
    const control = false as unknown as FormGroup;
    func(control);
    expect(service).toBeTruthy();
  });

  it('test for minDate', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate('1999/08/27');
    const control = ({
      get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }),
      value: '1999/08/27', parent: false
    } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate parent true', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate('1999/08/27');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }), value: '1999/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = year', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(1999, 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }), value: '1999/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = month', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(8, 'month');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }), value: '1999/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = day', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(27, 'day');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }), value: '1999/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = year ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(Number(undefined), 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = month ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(Number(undefined), 'month');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = day ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(Number(undefined), 'day');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = string IF', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate('2020', 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDate type = string ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.minDate(String(undefined), 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate('1998/08/27');
    const control = ({
      get: (name: any) => ({
        setValue: (i) => { },
        value: '1999/08/27'
      }), value: '1999/08/27', parent: false
    } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate parent true', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate('1998/08/27');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1999/08/27' }), value: '1999/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = year', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(1, 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2021/08/27' }), value: '2021/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = month', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(1, 'month');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2021/08/27' }), value: '2021/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = day', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(1, 'day');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2021/08/27' }), value: '2021/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = year ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(Number(undefined), 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = month ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(Number(undefined), 'month');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = day ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate(Number(undefined), 'day');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = string IF', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate('2020', 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDate type = string ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const func = service.maxDate('2019/08/08', 'year');
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '2019/08/27' }), value: '2019/08/27', parent: true } as unknown);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for isContentInArray', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: 'campo1' }), value: 'campo1', parent: true } as unknown);
    const func = service.isContentInArray('campo1', (map) => true, 'campo2');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for isContentInArray ELSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: undefined }), value: undefined, parent: true } as unknown);
    const func = service.isContentInArray('campo1', (map) => false, 'campo2');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for isContentInArrayWithValue', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1',
            setValue: (param2: any) => { },
            value: 'valor'
          }, {
            name: 'campoEqual',
            setValue: (param2: any) => { },
            value: 'equal'
          }, {
            name: 'campo3',
            setValue: (param2: any) => { },
            value: 'valor'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    const func = service.isContentInArrayWithValue('campo1', 'campoEqual', 'equal', (map) => true, 'campo3');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for isContentInArrayWithValue else value', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1Map',
            setValue: (param2: any) => { },
            value: 'valor'
          }, {
            name: 'campo2',
            setValue: (param2: any) => { },
            value: 'valor dif'
          }, {
            name: 'campo3',
            setValue: (param2: any) => { },
            value: 'valor'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    const func = service.isContentInArrayWithValue('campo1Map', 'campo2', 'valor', (map) => true, 'campo3');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for isContentInArrayWithValue else map ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1',
            setValue: (param2: any) => { },
            value: undefined
          }, {
            name: 'campo2',
            setValue: (param2: any) => { },
            value: 'valor'
          }, {
            name: 'campo3',
            setValue: (param2: any) => { },
            value: 'tresVal'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    const func = service.isContentInArrayWithValue('campo1', 'campo2', 'valor', (map) => false, 'campo3');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for resetMyCallbackValidation', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1',
            setValue: (param2: any) => { },
            value: 'valor1'
          },
          {
            name: 'campo2',
            setValue: (param2: any) => { },
            value: 'valor2'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: {
        get: (name: any) => {
          const controls = [
            {
              name: 'campo1',
              setValue: (param2: any) => { },
              value: 'valor1'
            },
            {
              name: 'campo2',
              setValue: (param2: any) => { },
              value: 'valor2'
            }
          ];
          const values = controls.filter(cnt => cnt.name === name)[0];
          return values;
        },
      },
      setValue: (param2) => { },
    };
    const func: any = service.resetMyCallbackValidation(['campo1', 'campo2']);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for resetMyCallbackValidation control parent false ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1',
            setValue: (param2: any) => { },
            value: 'valor1'
          },
          {
            name: 'campo2',
            setValue: (param2: any) => { },
            value: 'valor2'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: false,
      setValue: (param2) => { },
    };
    const func: any = service.resetMyCallbackValidation(['campo1', 'campo2']);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for resetMyCallbackValidation ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'campo1',
            setValue: (param2: any) => { },
            value: 'valor1'
          },
          {
            name: 'campo2',
            setValue: (param2: any) => { },
            value: 'valor2'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: {
        get: (name: any) => {
          const controls = [
            {
              name: 'campo1',
              setValue: (param2: any) => { },
              value: 'valor1',
              controls: [{
                get: (names: any) => {
                  const controlst = [
                    {
                      name: 'campo1',
                      setValue: (param2: any) => { },
                      value: 'valor1',
                      controls: [{}]
                    }
                  ];
                  const valuest = controlst.filter(cnt => cnt.name === name)[0];
                  return valuest;
                },
              }]
            }
          ];
          const values = controls.filter(cnt => cnt.name === name)[0];
          return values;
        },
      },
      setValue: (param2) => { },
    };
    const func: any = service.resetMyCallbackValidationArray('campo1', ['campo1']);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for resetMyCallbackValidationArray PARENT FALSE', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: undefined }), value: undefined, parent: false } as unknown);
    const func: any = service.resetMyCallbackValidationArray('campo1', ['campo1']);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup parent false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    const func = service.minDateGroup(1, 'year');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup required false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    const func = service.minDateGroup(1, 'year', (req: FormGroup) => false);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup whitout anio', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '08'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: undefined
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for != number fecha', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '08'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '08'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup('2020/8/8', 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for != number fecha else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '27'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2022'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup('2020/8/8', 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup fecha else year', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2030'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup fecha === month ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(130, 'month', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup fecha === month ELSE ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2020'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(1, 'month', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup fecha === day ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(130, 'day', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for minDateGroup fecha === day ELSE ', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2020'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.minDateGroup(1, 'day', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup parent false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    const func = service.maxDateGroup(1, 'year');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup required false', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    const func = service.maxDateGroup(1, 'year', (req: FormGroup) => false);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup whitout anio', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '08'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: undefined
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup fecha if year', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '8'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2022'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'year', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup fecha if month', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2020'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'month', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup fecha else month', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2015'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'month', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup fecha if day', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2019'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'day', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup fecha else day', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2015'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup(1, 'day', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup String date if', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2020'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup('2019/12/12', 'day', (req: FormGroup) => true);
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for maxDateGroup String date else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'mes',
            setValue: (param2: any) => { },
            value: '12'
          }, {
            name: 'dia',
            setValue: (param2: any) => { },
            value: '11'
          }, {
            name: 'anio',
            setValue: (param2: any) => { },
            value: '2015'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.maxDateGroup('2019/12/12');
    func(control as FormGroup);
    expect(service).toBeTruthy();
  });

  it('test for validationMinCurrValue', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      value: '$10.000',
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.validationMinCurrValue(9999, true);
    func(control);
    expect(service).toBeTruthy();
  });

  it('test for validationMinCurrValue else', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      value: '10.000',
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.validationMinCurrValue();
    func(control);
    expect(service).toBeTruthy();
  });

  it('test for validationMinCurrValue else 2', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      value: '$9.000',
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.validationMinCurrValue();
    func(control);
    expect(service).toBeTruthy();
  });

  it('test for validationMinCurrValue else 3', () => {
    const service: CustomFormValidatorsService = TestBed.inject(CustomFormValidatorsService);
    const control: any = {
      value: '$9.999',
      parent: true,
      setValue: (param2) => { },
    };
    const func = service.validationMinCurrValue(9999, true);
    func(control);
    expect(service).toBeTruthy();
  });

});
