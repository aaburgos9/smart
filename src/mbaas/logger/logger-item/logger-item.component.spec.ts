import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoggerItemComponent } from './logger-item.component';

describe('LoggerItemComponent', () => {
  let component: LoggerItemComponent;
  let fixture: ComponentFixture<LoggerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerItemComponent);
    component = fixture.componentInstance;
    component.data = {
      example: '',
      next: '',
      object: {
        item: ''
      }
    };
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('test copy', () => {
    component.ngOnInit();
    component.copy(component.data);
    expect(component).toBeTruthy();
  });

});
