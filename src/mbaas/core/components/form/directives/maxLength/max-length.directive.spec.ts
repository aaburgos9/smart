import { MaxLengthDirective } from './max-length.directive';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

class MockElementRef implements ElementRef {
  nativeElement = {
    value: 'namneTest',
    name : 'formcontrolname'
  };
}

describe('MaxLengthDirective', () => {
  let maxLengthDirective: MaxLengthDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaxLengthDirective, { provide: ElementRef, useClass: MockElementRef }],
      imports: [FormsModule, ReactiveFormsModule]
    });
    maxLengthDirective = TestBed.inject(MaxLengthDirective);
  });

  it('should create an instance', () => {
    const directive = new MaxLengthDirective(null);
    expect(directive).toBeTruthy();
  });

  it('OnInput', () => {
    const directive = new MaxLengthDirective(null);
    directive.element = { nativeElement: { value: 'aaaa', attributes: { getNamedItem : (i) => ({ value: ''})} }} as ElementRef;
    directive.formulario = ( { get: (a) => ({ setValue: (i) => {} })} as FormGroup);
    directive.max = 3;
    const cadena = 'cadenaString';
    const max = 7;
    directive.onInput();
    expect(directive.element.nativeElement.value).toEqual('aaa');
  });

  it('maxFilter true', () => {
    const directive = new MaxLengthDirective(null);
    const cadena = 'cadenaString';
    const max = 7;
    directive.maxFilter(cadena, max);
    const response = directive.maxFilter(cadena, max);
    expect(response).toEqual('cadenaS');
  });

  it('maxFilter false', () => {
    const directive = new MaxLengthDirective(null);
    const cadena = 'cadenaStringdos';
    const max = 16;
    const response = directive.maxFilter(cadena, max);
    expect(response).toEqual('cadenaStringdos');
  });

});
