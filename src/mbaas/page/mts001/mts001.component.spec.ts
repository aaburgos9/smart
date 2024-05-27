import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTS001Component } from './mts001.component';

describe('MTS001Component', () => {
  let component: MTS001Component;
  let fixture: ComponentFixture<MTS001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MTS001Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MTS001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
