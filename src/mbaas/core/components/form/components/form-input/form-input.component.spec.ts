import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FieldConfig } from './../../models/field-config.interface';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { FormInputComponent } from './form-input.component';
import { DirectiveModule } from '../../directives/directive.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = { name: 'name', failBorder: true };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormInputComponent],
      imports: [ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
        RouterTestingModule,
        PipeModuleModule,
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
    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    component.group = formBuilder.group({ name: new FormControl('') });
    component.config = fielConfig;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test specialCharsPattern onlyLetters', () => {
    spyOn(component, 'validOnlyLetters').and.callFake((): boolean =>  true );
    spyOn(component, 'validOnlyNumbers').and.callFake((): boolean =>  true );
    const even = {};
    component.specialCharsPattern(even, true, false);
    expect(component).toBeTruthy();
  });

  it('test specialCharsPattern onlyNumbers', () => {
    spyOn(component, 'validOnlyLetters').and.callFake((): boolean =>  true );
    spyOn(component, 'validOnlyNumbers').and.callFake((): boolean =>  true );
    const even = {};
    component.specialCharsPattern(even, false, true);
    expect(component).toBeTruthy();
  });

  it('should validOnlyNumbers', () => {
    spyOn(component, 'replaceValues').and.callFake((): boolean =>  true );
    const even = {};
    component.validOnlyNumbers(even);
    expect(component).toBeTruthy();
  });

  it('should validOnlyLetters', () => {
    spyOn(component, 'replaceValues').and.callFake((): boolean =>  true );
    const even = {};
    component.validOnlyLetters(even);
    expect(component).toBeTruthy();
  });

  it('should replaceValues onlyNumbers', () => {
    component.config.failBorder = false;
    const pattern = /[0-9]/;
    const even = {
      data: '123',
      target: {
        value: '1'
      }
    };
    const result = component.replaceValues(pattern, even);
    expect(result).toBeTruthy();
  });

  it('should replaceValues onlyNumbers false', () => {
    component.config.failBorder = false;
    const pattern = /[0-9]/;
    const even = {
      data: 'A',
      target: {
        value: 'A'
      }
    };
    const result = component.replaceValues(pattern, even);
    expect(result).toBeFalsy();
  });

  it('should replaceValues validOnlyLetters', () => {
    component.config.failBorder = false;
    const pattern = /[A-Z]/;
    const even = {
      data: 'ABC',
      target: {
        value: 'ABC'
      }
    };
    const result = component.replaceValues(pattern, even);
    expect(result).toBeTruthy();
  });

  it('should replaceValues validOnlyLetters false', () => {
    component.config.failBorder = false;
    const pattern = /[A-Z]/;
    const even = {
      data: '2',
      target: {
        value: '2'
      }
    };
    const result = component.replaceValues(pattern, even);
    expect(result).toBeFalsy();
  });

  it('should replaceValues validOnlyLetters false', () => {
    component.config.failBorder = true;
    const pattern = /[A-Z]/;
    const even = {
      data: 'ABC',
      target: {
        value: 'ABC'
      }
    };
    const result = component.replaceValues(pattern, even);
    expect(result).toBeTruthy();
  });

  it('should editField', () => {
    component.editField(true);
    expect(component).toBeTruthy();
  });

});
