import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextFieldComponent } from './form-text-field.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { TextfieldTypes } from 'src/mbaas/core/enums/textfield.enum';
import { FieldConfig } from '../../models/field-config.interface';

describe('FormTextFieldComponent', () => {
  let component: FormTextFieldComponent;
  let fixture: ComponentFixture<FormTextFieldComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  const mockFieldConfig: FieldConfig = {
    textfieldType: TextfieldTypes.SIMPLE,
    name: 'test',
    label: 'Label Test..',
    value: 'test1',
  };

  const mockInput = {
    nativeElement: {
      focus: () => {},
      select: () => {},
      value: '25000',
    },
  };

  const eventMock = {
    target: {
      value: '25000',
    },
  } as unknown as Event;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTextFieldComponent],
      imports: [
        ReactiveFormsModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: jwtTokenGetter,
            allowedDomains: ['.*'],
          },
        }),
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextFieldComponent);
    component = fixture.componentInstance;
    component.config = mockFieldConfig;
    component.group = formBuilder.group({
      [component.config.name]: [''],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should method ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should method ngOnInit for TextfieldTypes.SIMPLE', () => {
    component.config.textfieldType = undefined;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should method changeValue', () => {
    component.changeValue(eventMock);
    expect(component).toBeTruthy();
  });

  it('should method setDisabledState', () => {
    component.setDisabledState(true);
    expect(component).toBeTruthy();
  });

  it('should method validateTextfieldType', () => {
    component.validateTextfieldType();
    expect(component).toBeTruthy();
  });

  it('should method validateTextfieldType TextfieldTypes.EDIT ', () => {
    component.config.textfieldType = TextfieldTypes.EDIT;
    component.validateTextfieldType();
    expect(component).toBeTruthy();
  });

  it('should method validateTextfieldType TextfieldTypes.NUMBER', () => {
    component.config.textfieldType = TextfieldTypes.NUMBER;
    component.validateTextfieldType();
    expect(component).toBeTruthy();
  });

  it('should method validateTextfieldType TextfieldTypes.PASSWORD', () => {
    component.config.textfieldType = TextfieldTypes.PASSWORD;
    component.validateTextfieldType();
    expect(component).toBeTruthy();
  });

  it('should method validateTextfieldType TextfieldTypes.PASSWORD_NOT_DO_SHOW', () => {
    component.config.textfieldType = TextfieldTypes.PASSWORD_NOT_DO_SHOW;
    component.validateTextfieldType();
    expect(component).toBeTruthy();
  });

  it('should method validateInputClass is disabled', () => {
    component.config.disabled = true;
    component.validateInputClass(true);
    expect(component).toBeTruthy();
    expect(component.divNgClass).toContain('dav-textField__password');
  });

  it('should method validateInputClass TextfieldTypes.EDIT_TRAILING_ICON', () => {
    component.config.textfieldType = TextfieldTypes.EDIT_TRAILING_ICON;
    component.validateInputClass(true);
    expect(component).toBeTruthy();
    expect(component.divNgClass).toContain('dav-textField__trailingIcon');
  });

  it('should method validateInputClass TextfieldTypes.EDIT', () => {
    component.config.textfieldType = TextfieldTypes.EDIT;
    component.validateInputClass(true);
    expect(component).toBeTruthy();
    expect(component.divNgClass).toContain('dav-textField__edit');
  });

  it('should method validateInputClass TextfieldTypes.PASSWORD', () => {
    component.config.textfieldType = TextfieldTypes.PASSWORD;
    component.validateInputClass(true);
    expect(component).toBeTruthy();
    expect(component.divNgClass).toContain('dav-textField__password');
  });

  it('should method validateInputClass TextfieldTypes.EDIT_TRAILING_ICON', () => {
    component.config.textfieldType = TextfieldTypes.EDIT_TRAILING_ICON;
    component.invalidField = true;
    component.validateInputClass(false);
    expect(component).toBeTruthy();
  });

  it('should method validateInputClass Not TextfieldTypes.EDIT_TRAILING_ICON', () => {
    component.config.textfieldType = undefined;
    component.invalidField = true;
    component.validateInputClass(false);
    expect(component).toBeTruthy();
    expect(component.divNgClass).toContain('dav-textField__invalidField');
  });

  it('should method validateInputClass', () => {
    component.validateInputClass(false);
    expect(component).toBeTruthy();
  });

  it('should method onActionTextfield', () => {
    component.input = mockInput;
    component.isEditableField = true;

    component.onActionTextfield();

    expect(component).toBeTruthy();
    expect(component.showIcon).toBe(false);
    expect(component.isEditableField).toBe(false);
  });

  it('should method onActionTextfield TextfieldTypes.PASSWORD', () => {
    const spyHidePass = spyOn(component, 'hidePass').and.callThrough();
    component.config.textfieldType = TextfieldTypes.PASSWORD;
    component.input = mockInput;
    component.showPassword = true;

    component.onActionTextfield();

    expect(component).toBeTruthy();
    expect(spyHidePass).toHaveBeenCalled();
    expect(component.showPassword).toBe(false);
  });

  it('should method onActionTextfield TextfieldTypes.PASSWORD', () => {
    const spyHidePass = spyOn(component, 'hidePass').and.callThrough();
    component.config.textfieldType = TextfieldTypes.PASSWORD;
    component.input = mockInput;

    component.onActionTextfield();

    expect(component).toBeTruthy();
    expect(spyHidePass).not.toHaveBeenCalled();
    expect(component.showPassword).toBe(true);
  });

  it('should method action ', () => {
    component.action(eventMock);
    expect(component).toBeTruthy();
  });

  it('should method action TextfieldTypes.PASSWORD_LAST_CHARACTER', () => {
    component.config.textfieldType = TextfieldTypes.PASSWORD_LAST_CHARACTER;
    component.action(eventMock);
    expect(component).toBeTruthy();
  });
  it('should method action TextfieldTypes.PERCENTAGE', () => {
    component.input = mockInput;
    component.config.textfieldType = TextfieldTypes.PERCENTAGE;
    component.action(eventMock);
    expect(component).toBeTruthy();
  });

  it('should method action TextfieldTypes.PERCENTAGE -> Value 0', () => {
    component.input = {
      nativeElement: {
        ...mockInput.nativeElement,
        value: '0',
      },
    };
    component.config.textfieldType = TextfieldTypes.PERCENTAGE;
    component.action(eventMock);
    expect(component).toBeTruthy();
  });

  it('should method action -> setPercentage -> TextfieldTypes.PERCENTAGE', () => {
    component.value = '10%';
    component.input = {
      nativeElement: {
        ...mockInput.nativeElement,
        value: '10%',
      },
    };
    component.config.textfieldType = TextfieldTypes.PERCENTAGE;

    const eventMockPercentage = {
      target: {
        value: '25000%',
      },
    } as unknown as Event;

    component.action(eventMockPercentage);
    expect(component).toBeTruthy();
  });

  it('should method focusCaret ', () => {
    const mockEventKeyBoard = {
      key: '.',
      preventDefault: () => {},
      target: {
        setSelectionRange: () => {},
      },
    } as unknown as KeyboardEvent;
    component.focusCaret(mockEventKeyBoard);
    expect(component).toBeTruthy();
  });

  it('should method verifyInput TextfieldTypes.NUMBER', () => {
    component.config.textfieldType = TextfieldTypes.NUMBER;
    component.input = mockInput;
    component.verifyInput();
    expect(component).toBeTruthy();
  });

  it('should method verifyInput TextfieldTypes.PERCENTAGE', () => {
    component.config.textfieldType = TextfieldTypes.PERCENTAGE;
    component.input = mockInput;
    component.verifyInput();
    expect(component).toBeTruthy();
  });
});
