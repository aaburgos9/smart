import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FieldConfig } from './../../models/field-config.interface';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { FormSelectComponent } from './form-select.component';
import { DirectiveModule } from '../../directives/directive.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormSelectComponent', () => {
  let component: FormSelectComponent;
  let fixture: ComponentFixture<FormSelectComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = { name: 'name' };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormSelectComponent],
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
    fixture = TestBed.createComponent(FormSelectComponent);
    component = fixture.componentInstance;
    component.group = formBuilder.group({ name: new FormControl('') });
    component.config = fielConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngAfterContentChecked();
    expect(component).toBeTruthy();
  });

  it('should create disabled', () => {
    component.config.disabled = true;
    component.ngAfterContentChecked();
    expect(component).toBeTruthy();
  });

  it('should create value', () => {
    component.config.value = 'data';
    component.ngAfterContentChecked();
    expect(component).toBeTruthy();
  });

  it('should create saldo', () => {
    component.config.saldo = 10000000;
    component.ngAfterContentChecked();
    expect(component).toBeTruthy();
  });

});
