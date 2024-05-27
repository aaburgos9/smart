import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { DynamicForm } from '../models/dinamic-form.interface';
import { FieldConfig } from '../models/field-config.interface';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Validation } from '../models/validation.interface';

@Injectable({
  providedIn: 'root'
})
export class ComponentCreatorService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private fb: FormBuilder
  ) { }

  createComponent(type: DynamicForm, config: FieldConfig, ) {

  }

  // createGroup() {
  //   const group = this.fb.group({});
  //
  //   this.controls.forEach((fieldConfig: FieldConfig) => {
  //     if (fieldConfig.childs) {
  //       const childFormGroup = this.createChildFormGroup(fieldConfig);
  //
  //       group.addControl(fieldConfig.name, childFormGroup);
  //
  //     } else {
  //       group.addControl(fieldConfig.name, this.createFormControl(fieldConfig));
  //     }
  //   });
  //   return group;
  // }
  //
  // createFormControl(config: FieldConfig) {
  //   const { disabled, validation, value } = config;
  //   const validationsFn = this.createValidatorsFn(validation);
  //
  //   return this.fb.control({ disabled, value }, validationsFn);
  // }
  //
  // createChildFormGroup(fieldConfig: FieldConfig) {
  //   const formGroup = new FormGroup({});
  //   const childs: object = fieldConfig.childs;
  //
  //   for (const key in childs) {
  //     if (childs.hasOwnProperty(key)) {
  //       const controlName = childs[key].name;
  //       const validatorsFn = this.createValidatorsFn(childs[key].validation);
  //       const control = this.fb.control('', validatorsFn);
  //
  //       formGroup.addControl(controlName, control);
  //     }
  //   }
  //
  //   return formGroup;
  // }
  //
  // createValidatorsFn(validations: Validation[]): ValidatorFn[] {
  //   return validations.map((v: Validation) => v.validator);
  // }
}
