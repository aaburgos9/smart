import { FieldConfig } from './../../models/field-config.interface';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { FormSliderComponent } from './form-slider.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('FormSliderComponent', () => {
  let component: FormSliderComponent;
  let fixture: ComponentFixture<FormSliderComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  const fielConfig: FieldConfig = {
    value: '1',
    name: 'name',
    functions: {
      setValue: '1-1-1-1',
    },
    setValue: () => {},
  } as unknown as FieldConfig;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [FormSliderComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSliderComponent);
    component = fixture.componentInstance;
    component.group = formBuilder.group({ name: formBuilder.control('') });
    component.config = fielConfig;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });


  it('test for ngOnInit', () => {

    component.config = { ...fielConfig, value: '' };
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test for ngOnInit call modifyOffset', fakeAsync(() => {
    fixture.detectChanges();

    const spyModifyOffset = spyOn(component, 'modifyOffset').and.callThrough();

    const elInput = fixture.nativeElement.querySelector('input');
    elInput.value = 'testing';
    elInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(200);

    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
      expect(spyModifyOffset).toHaveBeenCalled();
      expect(spyModifyOffset).toHaveBeenCalledTimes(1);
    });
  }));

  it('test for ngOnInit value null ', () => {
    component.ngOnInit();
    component.config = {
      value: undefined,
      name: 'name',
      functions: {
        setValue: '1-1-1-1',
      },
      setValue: () => {},
    } as unknown as FieldConfig;
    expect(component).toBeTruthy();
  });

  it('test for rangeElement > 0', () => {
    component.range = 100;
    component.rangeElement = {
      nativeElement: {
        min: 10,
        max: 10,
        offsetWidth: 10,
      },
    };
    component.bubble = {
      nativeElement: {
        style: {
          left: 20,
          marginLeft: 10,
        },
      },
    };
    component.modifyOffset();
    expect(component).toBeTruthy();
  });

  it('test for rangeElement <= 0', () => {
    component.range = 1;
    component.rangeElement = {
      nativeElement: {
        min: 1,
        max: 2,
        offsetWidth: 0,
      },
    };
    component.bubble = {
      nativeElement: {
        style: {
          left: 0,
          marginLeft: 0,
        },
      },
    };
    component.modifyOffset();
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
