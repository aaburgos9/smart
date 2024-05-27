import { query } from '@angular/animations';
import { FormErrorDirective } from './form-error.directive';
import { FormGroup, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('FormErrorDirective', () => {

  const mockElement = {
    nativeElement: {
      attributes: {
        getNamedItem: (item) => {
          return {
            value: 'campo'
          };
        }
      },
      classList: {
        add: (item) => {},
        remove: (item) => {}
      }
    }
  };

  let directive: FormErrorDirective;
  directive = new FormErrorDirective(null);
  directive.element = mockElement;
  directive.form = new FormGroup({
    campo: new FormControl()
  });
  directive.formName = 'campo';

  it('should create an instance 1', () => {
    expect(directive).toBeTruthy();
  });

  it('should create element in directive', () => {
    expect(directive.element).toBeTruthy();
  });

  it('call setClass() with error', () => {
    directive.addErrorClass = 'errnoClass';
    spyOn(directive, 'getError').and.returnValue(true);
    directive.setClass();
    expect(directive.element).toBeTruthy();
  });

  it('call setClass() without error', () => {
    directive.addErrorClass = 'errnoClass';
    spyOn(directive, 'getError').and.returnValue(false);
    directive.setClass();
    expect(directive.element).toBeTruthy();
  });

  it('call getError() dirty', () => {
    directive.form.get('campo').setErrors({ incorrect: true });
    directive.form.get('campo').markAsDirty();
    expect(directive.getError()).toBeTruthy();
  });

  it('call getError() touched', () => {
    directive.form.get('campo').setErrors({ incorrect: true });
    directive.form.get('campo').markAsTouched();
    expect(directive.getError()).toBeTruthy();
  });

  it('test control value', () => {
    directive.form.get('campo').setValue('campo');
    expect(
      directive.element.nativeElement.attributes.getNamedItem().value
    ).toEqual(
        directive.form.get('campo').value
    );
  });

  it('test', () => {
    const anotherElement = {
      nativeElement: {
        attributes: {
          getNamedItem: (item) => {
            const valor = {
              formcontrolname: {
                value: 'testFormControlName'
              },
              controlname: {
                value: 'testFormControlName'
              },
              addErrorClass: {
                value: 'testFormControlName'
              }
            };
            return valor[item];
          }
        },
        classList: {
          add: (item) => {},
          remove: (item) => {}
        }
      }
    };
    let seconDirective: FormErrorDirective;
    seconDirective = new FormErrorDirective(anotherElement);
    seconDirective.form = new FormGroup({
      testFormControlName: new FormControl()
    });
    expect(seconDirective.formName).toEqual('testFormControlName');
  });

});
