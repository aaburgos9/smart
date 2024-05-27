import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FieldConfig } from '../../models/field-config.interface';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormInputMoneyComponent } from './form-input-money.component';
import { DirectiveModule } from '../../directives/directive.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { CurrencyPipe } from '@angular/common';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormInputComponent', () => {
  let component: FormInputMoneyComponent;
  let fixture: ComponentFixture<FormInputMoneyComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = { name: 'name' };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormInputMoneyComponent],
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
    fixture = TestBed.createComponent(FormInputMoneyComponent);
    component = fixture.componentInstance;
    component.group = formBuilder.group({ name: new FormControl('') });
    component.config = fielConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test ngOnInit with dollars and config value', () => {
    // eslint-disable-next-line dot-notation,@typescript-eslint/dot-notation
    component['config'] = {
      name: 'myForm',
      value: '10000',
      dollars: true
    };
    component.group = {
      get: (name) => {
        return {
          value: '10000',
          setValue: (value) => { },
          valueChanges: {
            subscribe: (func: any) => {}
          }
        };
      }
    } as FormGroup;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test editField', () => {
    component.editField(true);
    expect(component).toBeTruthy();
  });

  it('test editField false', () => {
    component.editField(false);
    expect(component).toBeTruthy();
  });

  it('test changeMSK', () => {
    // eslint-disable-next-line dot-notation,@typescript-eslint/dot-notation
    component['formControl'] = {
      value: '10000',
      setValue: (value) => { }
    } as FormControl;
    // eslint-disable-next-line dot-notation,@typescript-eslint/dot-notation
    component['dollars'] = true;
    component.changeMSK();
    expect(component).toBeTruthy();
  });

  it('test changeMSK dollar false', () => {
    // eslint-disable-next-line dot-notation,@typescript-eslint/dot-notation
    component['formControl'] = {
      value: '10000',
      setValue: (value) => { }
    } as FormControl;
    // eslint-disable-next-line dot-notation, @typescript-eslint/dot-notation
    component['dollars'] = false;
    component.changeMSK();
    expect(component).toBeTruthy();
  });

});
