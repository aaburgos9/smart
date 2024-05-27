import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPhoneComponent } from './form-phone.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DirectiveModule } from '../../directives/directive.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { FieldConfig } from '../../models/field-config.interface';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormPhoneComponent', () => {
  let component: FormPhoneComponent;
  let fixture: ComponentFixture<FormPhoneComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = {
    name: 'name',
    children: [
      {
        placeholder: 'DD',
        name: 'dia'
      },
      {
        placeholder: 'MM',
        name: 'mes'
      },
      {
        placeholder: 'YY',
        name: 'anio'
      }
    ],
  };

  const fielConfigError: FieldConfig = {
    name: 'name',
    children: [
      {
        placeholder: 'DD',
        name: 'dia'
      },
      {
        placeholder: 'MM',
        name: 'mes'
      },
      {
        placeholder: 'YY',
        name: 'anio'
      },
      {
        placeholder: 'YYy',
        name: 'anioo'
      }
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormPhoneComponent],
      imports: [ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
        RouterTestingModule,
        DirectivesModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
            allowedDomains: ['.*']
          }
        })],
      providers: [HttpClientTestingModule, {
        provide: FormBuilder,
        useValue: formBuilder
      }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPhoneComponent);
    component = fixture.componentInstance;
    component.config = fielConfig;
    component.group = formBuilder.group({
      name: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
    });
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test for getFormGroup', () => {
    expect(component.getFormGroup()).toEqual(component.phoneFormGroup);
  });

  it('test for getFormGroup', () => {
    expect(component.validField()).toEqual(component.fieldValidity);
  });

  it('test for specialCharsPattern', () => {
    const event = {
      target: {
        value: '',
        data: '',
      }
    };
    component.specialCharsPattern(event, false, true);
    expect(component).toBeTruthy();
  });

  it('test for specialCharsPattern else', () => {
    // eslint-disable-next-line dot-notation, @typescript-eslint/dot-notation
    component['respaldo'] = '12152123';
    const event = {
      target: {
        value: '',
        data: 123,
      },
      data: '',
    };
    component.specialCharsPattern(event);
    expect(component).toBeTruthy();
  });

  it('test for specialCharsPattern else two data complete', () => {
    component.config.failBorder = true;
    const event = {
      target: {
        value: '',
        data: '123456',
      },
      data: '123456',
    };
    component.specialCharsPattern(event, true, false);
    expect(component).toBeTruthy();
  });

  it('test for specialCharsPattern pattern.test(character) else two ', () => {
    component.config.failBorder = false;
    const event = {
      target: {
        value: '',
        data: '123456',
      },
      data: '123456',
    };
    component.specialCharsPattern(event, true, false);
    expect(component).toBeTruthy();
  });

  it('test for specialCharsPattern else email data complete', () => {
    component.config.inputType = 'email';
    component.config.failBorder = true;
    const event = {
      target: {
        value: '',
        data: 'abcd@abcd.com',
      },
      data: 'abcd@abcd.com',
    };
    component.specialCharsPattern(event, false, false);
    expect(component).toBeTruthy();
  });

});
