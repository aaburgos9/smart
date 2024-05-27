import { OnlyLettersDirective } from './only-letters.directive';

describe('OnlyLettersDirective', () => {

  it('should create directive', () => {
    const directive = new OnlyLettersDirective();
    expect(directive).toBeDefined();
  });

  it('should create an instance 40', () => {
    const directive = new OnlyLettersDirective();
    const even = { charCode: 40 };
    directive.soloLetras = true;
    expect(directive.onKeyPress(even)).toBeTruthy();
  });

  it('should create an instance 50', () => {
    const directive = new OnlyLettersDirective();
    const even = { charCode: 50 };
    directive.soloLetras = true;
    expect(directive.onKeyPress(even)).toBeFalsy();
  });

});
