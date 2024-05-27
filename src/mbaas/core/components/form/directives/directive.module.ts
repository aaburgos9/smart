import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictDirective } from './restrict/restrict.directive';
import { MaxLengthDirective } from './maxLength/max-length.directive';
import { UpperCaseDirective } from './upperCase/upper-case.directive';
import { SpecialChartDirective } from './specialChart/special-chart.directive';
import { OnlyLettersDirective } from './onlyLetters/only-letters.directive';
import { FormErrorDirective } from './formError/form-error.directive';

@NgModule({
  declarations: [
    RestrictDirective,
    MaxLengthDirective,
    UpperCaseDirective,
    SpecialChartDirective,
    OnlyLettersDirective,
    FormErrorDirective
  ],
  exports: [
    RestrictDirective,
    MaxLengthDirective,
    UpperCaseDirective,
    SpecialChartDirective,
    OnlyLettersDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectiveModule { }
