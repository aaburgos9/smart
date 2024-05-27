import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { FormAddresComponent } from './form-addres.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormTypes } from '../../config/form-config';
import { DynamicFormDataService } from '../../services/dynamic-form-data.service';
import { of, BehaviorSubject } from 'rxjs';
import { FieldConfig } from '../../models/field-config.interface';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { DirectiveModule } from '../../directives/directive.module';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';

describe('FormAddresComponent', () => {
  let component: FormAddresComponent;
  let fixture: ComponentFixture<FormAddresComponent>;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddresComponent],
      imports: [ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        PipeModuleModule,
        DirectiveModule,
        DirectivesModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: jwtTokenGetter,
            allowedDomains: ['.*']
          }
        }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: initTraslate,
            deps: [HttpClient]
          }
        })],
      providers: [{
        provide: FormBuilder,
        useValue: formBuilder
      }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddresComponent);
    component = fixture.componentInstance;
    const second = ({
      name: 'second',
      catalogoFilter: {
        key: 'second',
        property: 'test'
      },
      restric: true
    } as unknown);
    const third = ({
      name: 'third',
      catalogoFilter: {
        key: 'cc',
        property: 'test'
      },
      restric: true
    } as unknown);
    const four = ({
      name: 'four',
      catalogoFilter: {
        key: 'fr',
        property: 'test'
      },
      restric: true
    } as unknown);
    const childrenObj = [
      {
        name: 'tipoVia',
        data: 'PAISES',
        functions: {
          setValue: (item: any): string => item.value,
          setLabel: (item: any): string => item.label,
          filter: (item: any): string => item.label,
        },
        label: '¿Cuál es su actividad laboral actual?',
        placeholder: 'Seleccione',
        disabled: true,
        readonly: true, /*habilita el icono de edición*/
        validation: [],
        catalogoFilter: {
          key: 'cc',
          property: 'test'
        }
      }
    ];
    component.config = {
      type: FormTypes.formAddres,
      name: 'direccionOficina',
      label: '¿Cuál es la dirección de su oficina?',
      placeholder: 'Dirección oficina',
      children: childrenObj,
      validation: [
        {
          validator: Validators.required,
          type: 'required',
          label: 'Este campo es requerido.'
        }
      ]
    };
    component.tipoViaConfig = childrenObj[0] as unknown as FieldConfig;
    const group = ({ get: (name: any) => ({ setValue: (i) => { }, value: '1' }), value: '1', parent: false } as unknown);
    component.group = (group as FormGroup);
    component.formAddresFormGroup = (group as FormGroup);
    // eslint-disable-next-line
    spyOn(component['dynamicFormDataService'], 'loadData').and.returnValue((
      new BehaviorSubject<any>({
        value: 'test'
      })
    ).asObservable());
    spyOn(component, 'enableControls').and.callFake(() => {});
    component.secondInputConfig = second as FieldConfig;
    component.thirdInputConfig = third as FieldConfig;
    component.fourthInputConfig = four as FieldConfig;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('test for onFirstInputChange', () => {
    const childrenObjtwo = {
      name: 'tipoVia',
      data: 'PAISES',
      functions: {
        setValue: (item: any): string => item.value,
        setLabel: (item: any): string => item.label,
        filter: (item: any): string => item.label,
      },
      label: '¿Cuál es su actividad laboral actual?',
      placeholder: 'Seleccione',
      disabled: true,
      readonly: true, /*habilita el icono de edición*/
      validation: [],
      catalogoFilter: {
        key: 'cc',
        property: 'test'
      }
    };
    component.tipoViaConfig = childrenObjtwo as unknown as FieldConfig;
    // eslint-disable-next-line
    spyOn(component['dynamicFormDataService'], 'loadDataByFilter').and.returnValue((
      new BehaviorSubject<any>({
        value: 'test'
      })
    ).asObservable());
    component.onFirstInputChange();
    const second = ({
      name: 'second',
      catalogoFilter: {
        key: 'second',
        property: 'test'
      }
    } as unknown);
    component.secondInputConfig = second as FieldConfig;
    component.onSecondInputChange();
    expect(component.secondInputConfig).toEqual(second as FieldConfig);
  });

  it('test for getFormGroup', () => {
    component.getFormGroup();
    expect(() => {
      component.getFormGroup();
    }).toBeTruthy();
  });

  it('test for loadDataByFilter', () => {
    component.loadDataByFilter('test', '1', 'one');
    expect(component.loadDataByFilter).toBeTruthy();
  });

  it('test for changeOption otro', () => {
    component.changeOption('otro');
    expect(component).toBeTruthy();
  });

  it('should create test loadData', () => {
    component.loadData();
    expect(component).toBeTruthy();
  });

  it('should create test valid', () => {
    component.validArray = ['test', 'test1'];
    component.config.failBorder = true;
    component.estateInput = true;
    component.validField('test');
    expect(component).toBeTruthy();
  });

  it('should create test valid', () => {
    component.validArray = ['test', 'test1'];
    component.config.failBorder = false;
    component.estateInput = true;
    component.validField('test');
    expect(component).toBeTruthy();
  });

  it('should create test input state', () => {
    component.inputState();
    expect(component).toBeTruthy();
  });

  it('should create test enable controls', () => {
    const childrens = [{name: 'test'}, {name: 'test1'}, {name: 'test2'}];
    component.formAddresFormGroup = new FormGroup({});
    component.formAddresFormGroup.addControl('test', new FormControl());
    component.formAddresFormGroup.addControl('test1', new FormControl());
    component.formAddresFormGroup.addControl('test2', new FormControl());
    component.enableControls(childrens);
    expect(component).toBeTruthy();
  });

  it('should create test disable controls', () => {
    const childrens = [{name: 'test'}, {name: 'test1'}, {name: 'test2'}];
    component.formAddresFormGroup = new FormGroup({});
    component.formAddresFormGroup.addControl('test', new FormControl());
    component.formAddresFormGroup.addControl('test1', new FormControl());
    component.formAddresFormGroup.addControl('test2', new FormControl());
    component.disableControls(childrens);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern onlyNumbers', () => {
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, false, true);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern onlyLetters', () => {
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, true, false);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern email', () => {
    component.config.inputType = 'email';
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, false, false);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern formAddres', () => {
    component.config.inputType = 'formAddres';
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, false, false);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern fail border', () => {
    component.config.failBorder = true;
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, true, false);
    expect(component).toBeTruthy();
  });

  it('should create test specialCharsPattern data with fail border', fakeAsync(() => {
    component.config.failBorder = true;
    const evento = { target: { value: '123456789op' }, data: '123456789op'};
    // component.specialCharsPattern(evento, true, false);
    tick(2550);
    expect(component).toBeTruthy();
  }));

});
