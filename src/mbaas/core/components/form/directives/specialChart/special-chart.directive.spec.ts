import { SpecialChartDirective } from './special-chart.directive';

describe('SpecialChartDirective', () => {
  it('should create an instance', () => {
    const directive = new SpecialChartDirective();
    directive.caracteresEspeciales = true;
    const event = { charCode: '92' };
    directive.onKeyPress(event);
    expect(directive).toBeTruthy();
  });

  it('should create an instance else', () => {
    const directive = new SpecialChartDirective();
    directive.caracteresEspeciales = false;
    const event = { charCode: '92', target: { value: ' ' } };
    directive.onKeyPress(event);
    expect(directive).toBeTruthy();
  });

  it('test for directive onKeyPress instance', () => {
    const directive = new SpecialChartDirective();
    directive.caracteresEspeciales = true;
    const event = { charCode: '97', target: { value: 'a' } };
    directive.onKeyPress(event);
    expect(directive).toBeTruthy();
  });

  it('test for directive onKeyPress instance two', () => {
    const directive = new SpecialChartDirective();
    directive.caracteresEspeciales = true;
    const event = { charCode: 209, target: { value: 'Ñ' } };
    directive.onKeyPress(event);
    expect(directive).toBeTruthy();
  });
});
