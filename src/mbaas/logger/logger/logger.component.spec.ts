import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoggerComponent } from './logger.component';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { LoggerItemComponent } from '../logger-item/logger-item.component';


describe('LoggerComponent', () => {
  let component: LoggerComponent;
  let fixture: ComponentFixture<LoggerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerComponent, LoggerItemComponent ],
      providers: [
        SendInformationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.isLogger = false;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.isLogger = true;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('response()', () => {
    component.ngOnInit();
    component.log = [];
    component.response()({ data: '' });
    component.response()(null);
    expect(component).toBeTruthy();
  });

  it('onChange()', () => {
    component.onChange({target: () => {}});
    expect(component).toBeTruthy();
  });

});
