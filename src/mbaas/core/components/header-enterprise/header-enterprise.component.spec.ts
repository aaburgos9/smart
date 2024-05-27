import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEnterpriseComponent } from './header-enterprise.component';

describe('HeaderComponent', () => {
  let component: HeaderEnterpriseComponent;
  let fixture: ComponentFixture<HeaderEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
