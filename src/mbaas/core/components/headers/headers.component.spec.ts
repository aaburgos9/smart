import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersComponent } from './headers.component';

describe('HeadersComponent', () => {
  let component: HeadersComponent;
  let fixture: ComponentFixture<HeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should OnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should openAndCloseNav', () => {
     component.openAndCloseNav();
     component.isExpanded= true;
    expect(component.openAndCloseNav()).toEqual('Expandable');
  });

  it('should openAndCloseNav false', () => {
    component.openAndCloseNav();
    component.isExpanded= false;
   expect(component.openAndCloseNav()).toEqual('Expandable--false');
 });


});
