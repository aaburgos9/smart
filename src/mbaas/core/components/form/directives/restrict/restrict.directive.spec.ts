import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RestrictDirective } from './restrict.directive';

describe('RestrictDirective', () => {
  // const restrictDirective = new RestrictDirective(null);
  let renderedValues: any;
  let fixture: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [RestrictDirective, TestComponent]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
    renderedValues = fixture.debugElement.queryAll(By.directive(RestrictDirective));
  });

  it('number elements redered', () => {
    expect(renderedValues.length).toBe(1);
  });

  it('tes change on input', fakeAsync(() => {
    const input = renderedValues[0].nativeElement as HTMLInputElement;
    expect(input.value).toBe('');

    input.value = 'text1234';

    input.dispatchEvent(new Event('input'));
    tick(40);
    fixture.detectChanges();

    expect(input.value).toBe('text');
  }));

});

@Component({
  template: `<input [ccRestrict]="'abcdefghijklmnopqrstvwxyz'" value=""/>`
})
class TestComponent { }
