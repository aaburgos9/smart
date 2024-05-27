import { FieldConfig } from './../../models/field-config.interface';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormButtonComponent } from './form-button.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';

describe('FormButtonComponent', () => {
  let component: FormButtonComponent;
  let fixture: ComponentFixture<FormButtonComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = {
    name: 'name',
    disabled: true,
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DirectivesModule
      ],
      declarations: [
        FormButtonComponent,
        ButtonComponent
      ],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonComponent);
    component = fixture.componentInstance;
    component.group = formBuilder.group({ name: new FormControl('') });
    component.config = fielConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    component.group.disable();
    expect(component).toBeTruthy();
    expect(component.group.value.name).toBe(1);
    expect(component.group.disabled).toBeTruthy();
  });
});
