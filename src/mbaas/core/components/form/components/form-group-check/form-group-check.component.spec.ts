import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormGroupCheckComponent } from './form-group-check.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DirectiveModule } from '../../directives/directive.module';
import { PassSecurityTrustPipe } from 'src/mbaas/core/pipes/passSecurityTrust/pass-security-trust.pipe';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';

describe('FormGroupCheckComponent', () => {
  let component: FormGroupCheckComponent;
  let fixture: ComponentFixture<FormGroupCheckComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormGroupCheckComponent,
        PassSecurityTrustPipe
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
        DirectivesModule
      ],
      providers: [{
        provide: FormBuilder,
        useValue: formBuilder
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupCheckComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    component.config = { name: 'test' };
    component.group = {
      get: () => { }
    } as unknown as FormGroup;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test for ngAfterViewInit', () => {
    expect(component).toBeTruthy();
  });

  it('test for setValue else', () => {
    // eslint-disable-next-line
    component['formControl'] = {
      setValue: () => { }
    } as unknown as FormControl;
    // eslint-disable-next-line
    component['arregloFormArray'] = ['test'];
    component.setValue('test', false);
    expect(component).toBeTruthy();
  });

  it('test for setValue', () => {
    // eslint-disable-next-line
    component['formControl'] = {
      setValue: () => { }
    } as unknown as FormControl;
    // eslint-disable-next-line
    component['arregloFormArray'] = [];
    component.setValue('test', true);
    expect(component).toBeTruthy();
  });
});
