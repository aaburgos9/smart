
 import {
   ComponentFactoryResolver,
   ComponentRef,
   ViewContainerRef,
 } from '@angular/core';

 import { DynamicFieldDirective } from './dynamic-field.directive';

 import { FormBuilder } from '@angular/forms';
 import { COMPONENTS, FormTypes } from '../../config/form-config';
 import { FieldConfig } from '../../models/field-config.interface';
 import { Field } from '../../models/field.interface';

 describe('DynamicFieldDirective', () => {
   let directive: DynamicFieldDirective;

   const spyComponentFactoryResolver: jasmine.SpyObj<ComponentFactoryResolver> =
     jasmine.createSpyObj('ComponentFactoryResolver', [
       'resolveComponentFactory',
     ]);

   const spyViewContainerRef: jasmine.SpyObj<ViewContainerRef> =
     jasmine.createSpyObj('ViewContainerRef', ['createComponent']);

   const fieldConfigMock: FieldConfig = {
     type: FormTypes.input,
     name: 'fechaNacimiento',
     label: '¿Cuál es su fecha de nacimiento?',
   };

   const componentMock = {
     instance: { config: {}, group: {} },
   } as unknown as ComponentRef<Field>;

   beforeEach(() => {
     const formBuilder: FormBuilder = new FormBuilder();
     directive = new DynamicFieldDirective(
       spyComponentFactoryResolver,
       spyViewContainerRef
     );

     spyViewContainerRef.createComponent.and.returnValue(componentMock);

     directive['component'] = componentMock;
     directive.config = fieldConfigMock;
     directive.group = formBuilder.group({ name: 'Name' });
   });

   it('should create', () => {
     expect(directive).toBeTruthy();
   });

   it('should method ngOnChanges', () => {
     directive.ngOnChanges();
     expect(directive).toBeTruthy();
   });

   it('should method ngOnInit', () => {
     directive.ngOnInit();
     expect(directive).toBeTruthy();
   });

//    it('should method ngOnInit 2', () => {
//      const supportedTypes = Object.keys(COMPONENTS).join(', ');
//      directive.config = {
//        ...fieldConfigMock,
//        type: FormTypes.date,
//      };

//      expect(() => directive.ngOnInit()).toThrow(
//        new Error(`Trying to use an unsupported type (${'date'}).
//          Supported types: ${supportedTypes}`)
//      );
//  });
  afterEach(() => {
    directive = null;
  });
});
