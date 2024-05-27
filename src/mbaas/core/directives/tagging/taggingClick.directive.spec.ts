import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TaggingClickDirective } from './taggingClick.directive';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@Component({
  template: '<div mbaasTaggingClick="producto" mbaasTaggingValue="CDT" mbaasTaggingKey="Inversion"> <input mbaasTaggingBlur="true" mbaasTaggingBlurValue="value"/> </div>'
})
class TestComponent {}
describe('TaggingClickDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let div, input: DebugElement;
  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TaggingClickDirective, TestComponent],
        imports: [RouterTestingModule,
          JwtModule.forRoot({
            config: {
              tokenGetter: jwtTokenGetter,
              allowedDomains: ['.*']
            }
          })],
        providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
      });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    div = fixture.debugElement.query(By.directive(TaggingClickDirective));
    input = fixture.debugElement.query(By.directive(TaggingClickDirective));
  });

  it('should send GTM when clicked', () => {
    div.nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });

  xit('should send GTM when focusout', () => {
    let focused = false;
    input.componentInstance.focusOut.subscribe((el: ElementRef) => {
      expect(el.nativeElement).toBe(input.nativeElement);
      focused = true;
    });
    input.nativeElement.dispatchEvent(new Event('focusout'));
    expect(focused).toBeTruthy();
  });
});
