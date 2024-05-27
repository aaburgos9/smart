import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCheckComponent } from './form-check.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { FieldConfig } from '../../models/field-config.interface';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { RouterTestingModule } from '@angular/router/testing';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { group } from 'console';

describe('FormCheckComponent', () => {
  let component: FormCheckComponent;
  let fixture: ComponentFixture<FormCheckComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormCheckComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PipeModuleModule,
        DirectivesModule,
        RouterTestingModule,
      ],
      providers: [{
        provide: FormBuilder,
        useValue: formBuilder
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckComponent);
    component = fixture.componentInstance;
    component.config = {
      name: 'test',
      label: '',
      checkLabel: {
        initLabel: '',
        actionLabel: '',
        endLabel: ''
      }
    } as FieldConfig;
    component.group = new FormGroup({});
    component.group.addControl(component.config.name, new FormControl());
    component.childrenContainerClass = { nativeElement: { textContent: 'test txt' } };
    component.obser = TestBed.inject(SendInformationService);
    fixture.detectChanges();
    component.clickEvent();
  });

  it('should create', () => {
    component.config= {name: 'test'}as FieldConfig;
    const group: any = {
      get:(data: any) =>{
        const controls = [
          {
            name: 'test',
            setValue: (param2: any) => { },
            value: 'any'
          }
        ];
        const values = controls.filter(cnt => cnt.name === data)[0];
        return values;
      },
      setValue: (param2) => { },
    }
    component.group = group;
    component.ngOnInit();
    component.ngAfterViewInit();
    component.setValue();
    expect(component).toBeDefined();
  });


});
