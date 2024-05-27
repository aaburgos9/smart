import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormTypes } from './../../config/form-config';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { DirectiveModule } from './../../directives/directive.module';
import { DynamicFieldDirective } from './../../directives/dynamic-field/dynamic-field.directive';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormToggleComponent } from '../../components/form-toggle/form-toggle.component';
import { By } from '@angular/platform-browser';
import { PassSecurityTrustPipe } from 'src/mbaas/core/pipes/passSecurityTrust/pass-security-trust.pipe';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { initTraslate, jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fieldConfig: FieldConfig = {
    name: 'Name',
    disabled: true,
    type: 'input' as FormTypes,
    validation: [{
      validator: Validators.required,
      type: 'required',
      label: 'Error required'
    }]
  };

  const fieldConfigChildren: FieldConfig = {
    name: 'Name',
    disabled: false,
    type: 'toggle' as FormTypes,
    children: [{
      name: 'child',
      type: 'input' as FormTypes,
      validation: [{
        validator: Validators.required,
        type: 'required',
        label: 'Error required'
      }]
    }]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormContainerComponent,
        DynamicFieldDirective,
        FormInputComponent,
        FormToggleComponent,
        PassSecurityTrustPipe
      ],
      imports: [DirectiveModule,
        FormsModule,
        ReactiveFormsModule,
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
            deps: [HttpClientTestingModule]
          }
        })],
      providers: [
        FormBuilder, {
          provide: FormBuilder,
          useValue: formBuilder
        },
        FormInputComponent,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
    })
    .overrideModule(
      BrowserDynamicTestingModule,
      {
        set: {

        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test input 1', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Test input 2', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Test setDisabled() true', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    component.setDisabled('Name', true);
    fixture.detectChanges();
    expect(component.form.disabled).toBeTruthy();
  });

  it('Test setDisabled() true else one', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    component.setDisabled('test', true);
    expect(component.setDisabled('test', true)).toEqual(undefined);
  });

  it('Test setDisabled() true if', () => {
    component.config = [{ name: 'test' }, { name: 'testting' }];
    component.setDisabled('test', true);
    expect(component.setDisabled('test', true)).toEqual(undefined);
  });

  it('test for handleSubmit', () => {
    const event = {
      type: 'submit',
      preventDefault() {},
      stopPropagation() {},
    };
    const spyEmit = spyOn(component.submit, 'emit').and.callFake(() => {});
    fixture.detectChanges();
    component.handleSubmit(event as Event);
    expect(spyEmit).toHaveBeenCalled();
  });

  it('Test setDisabled() false', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    component.setDisabled('Name', false);
    fixture.detectChanges();
    expect(component.form.disabled).toBeFalsy();
  });

  it('Test setValue()', () => {
    component.config = [fieldConfig];
    component.ngOnInit();
    component.setValue('Name', 'lastValue');
    fixture.detectChanges();
    expect(component.form.value.Name).toEqual('');
  });

  it('Test createChild()', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.form.value.Name.child).toBeDefined();
  });

  it('Test controls', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.controls.length).toBeGreaterThan(0);
  });

  it('Test valid', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.valid).toBeFalsy();
  });

  it('Test value', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    component.form.get('Name').setValue({ child: 'New Value' });
    expect(component.value.Name.child).toEqual('New Value');
  });

  it('Test value', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    component.form.get('Name').setValue({ child: 'New Value' });
    expect(component.changes).toBeTruthy();
  });

  it('Test Submit', () => {
    component.config = [fieldConfigChildren];
    component.ngOnInit();
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.dynamic-form'));
    component.form.get('Name').setValue({ child: 'New Value' });
    element.triggerEventHandler('submit', Event);
    expect(component.valid).toBeTruthy();
  });

});
