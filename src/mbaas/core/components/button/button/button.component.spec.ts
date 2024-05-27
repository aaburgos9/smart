import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  setPosition', () => {
    component.setPosition(new MouseEvent('click'));
    expect(component).toBeTruthy();
  });

  it('click', () => {
    component.click();
    expect(component).toBeTruthy();
  });

  it('click', () => {
    component.noClick();
    expect(component).toBeTruthy();
  });
});
