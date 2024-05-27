import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { FormCheckComponentOpts } from './form-check.-opts.component';
import { PipeModuleModule } from '../../../../pipes/pipe-module.module';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';

describe('FormCheckComponentOpts', () => {
  let component: FormCheckComponentOpts;
  let fixture: ComponentFixture<FormCheckComponentOpts>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckComponentOpts],
      imports: [ReactiveFormsModule,
        FormsModule,
        PipeModuleModule,
        DirectivesModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(FormCheckComponentOpts);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.config = { name: 'test' } as FieldConfig;
    const group: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'test',
            setValue: (param2: any) => { },
            value: 'any'
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    component.group = group;
    component.ngOnInit();
    component.setValue();
    expect(component).toBeDefined();
  });

  it('test for addFunction', () => {
    component.addFunction();
    expect(component).toBeDefined();
  });

  it('test for clickEvent', () => {
    component.clickEvent();
    expect(component).toBeDefined();
  });

  it('test for setValue und or null', () => {
    component.config = { name: 'test' } as FieldConfig;
    const group: any = {
      get: (name: any) => {
        const controls = [
          {
            name: 'test',
            setValue: (param2: any) => { },
            value: undefined
          }
        ];
        const values = controls.filter(cnt => cnt.name === name)[0];
        return values;
      },
      setValue: (param2) => { },
    };
    component.group = group;
    component.ngOnInit();
    component.setValue();
    expect(component).toBeDefined();
  })});
