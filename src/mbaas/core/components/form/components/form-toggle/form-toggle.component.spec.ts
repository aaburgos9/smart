import { DynamicFieldDirective } from './../../directives/dynamic-field/dynamic-field.directive';
import { DirectiveModule } from './../../directives/directive.module';
import { FormContainerComponent } from './../../containers/form-container/form-container.component';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormToggleComponent } from './form-toggle.component';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { JwtModule } from '@auth0/angular-jwt';
import { FormModule } from '../../form.module';
import { CommonModule } from '@angular/common';
import { FieldConfig } from '../../models/field-config.interface';
import { FormTypes } from '../../config/form-config';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FormToggleComponent', () => {
  let component: FormToggleComponent;
  let fixture: ComponentFixture<FormToggleComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = {
    name: 'name',
    children: [{
      name: 'child',
      type: 'input' as FormTypes,
      validation: []
    }]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,
        ReactiveFormsModule,
        FormModule,
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
    fixture = TestBed.createComponent(FormToggleComponent);
    component = fixture.componentInstance;
    component.config = fielConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });

  it('test onCheckboxToggle', () => {
    component.group = formBuilder.group({
      name: new FormControl(''),
      child: new FormControl('')
    });
    component.onCheckboxToggle();
    expect(component).toBeTruthy();
  });

  it('test onCheckboxToggle false', () => {
    component.checkboxToggle = true;
    component.group = formBuilder.group({
      name: new FormControl(''),
      child: new FormControl('')
    });
    component.onCheckboxToggle();
    expect(component).toBeTruthy();
  });

});
