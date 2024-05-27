import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UpperCaseDirective } from './upper-case.directive';

describe('UpperCaseDirective', () => {
  let renderedValues: any;
  let fixture: any;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [UpperCaseDirective, TestComponent]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
    renderedValues = fixture.debugElement.queryAll(By.directive(UpperCaseDirective));
  });

  it('number elements redered', () => {
    expect(renderedValues.length).toBe(1);
  });

  it('tes change on input', () => {
    const input = renderedValues[0].nativeElement as HTMLInputElement;
    expect(input.value).toBe('');

    input.value = 'text';

    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(input.value).toBe('TEXT');
  });

});

@Component({
  template: `<input [upperCase]="true" value=""/>`
})
class TestComponent { }
