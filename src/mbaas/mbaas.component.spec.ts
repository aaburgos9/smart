import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MbaasComponent } from './mbaas.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MbaasComponent', () => {
  let component: MbaasComponent;
  let fixture: ComponentFixture<MbaasComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        MbaasComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbaasComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    component.moveScroll();
    expect(app).toBeTruthy();
  });
});
