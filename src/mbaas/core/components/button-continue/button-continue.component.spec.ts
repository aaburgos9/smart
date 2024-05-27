import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonContinueComponent } from './button-continue.component';

describe('ButtonContinueComponent', () => {
  let component: ButtonContinueComponent;
  let fixture: ComponentFixture<ButtonContinueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonContinueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#click', () => {
    component.click();
    expect(component.click).toBeTruthy();

  });
});
