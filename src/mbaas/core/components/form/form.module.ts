import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormContainerComponent } from './containers/form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './directives/dynamic-field/dynamic-field.directive';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormToggleComponent } from './components/form-toggle/form-toggle.component';

import { DirectiveModule } from './directives/directive.module';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormCheckComponent } from './components/form-check/form-check.component';
import { PipeModuleModule } from '../../pipes/pipe-module.module';
import { FormAddresComponent } from './components/form-addres/form-addres.component';
import { FormPhoneComponent } from './components/form-phone/form-phone.component';
import { FormGroupCheckComponent } from './components/form-group-check/form-group-check.component';
import { FormInputMoneyComponent } from './components/form-input-money/form-input-money.component';
import { FormSliderComponent } from './components/form-slider/form-slider.component';
import { FormCheckComponentOpts } from './components/form-check-opts/form-check.-opts.component';
import { ButtonComponent } from './components/form-button/button.component';
import { DirectivesModule } from '../../directives/directives.mudule';
import { FormRecaptchaComponent } from './components/form-recaptcha/form-recaptcha.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FormTextFieldComponent } from './components/form-text-field/form-text-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
    DirectivesModule,
    PipeModuleModule,
    NgxCaptchaModule,
  ],
  declarations: [
    DynamicFieldDirective,
    FormContainerComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormToggleComponent,
    FormRadioComponent,
    FormCheckComponent,
    FormCheckComponentOpts,
    FormAddresComponent,
    FormPhoneComponent,
    FormGroupCheckComponent,
    FormInputMoneyComponent,
    FormSliderComponent,
    ButtonComponent,
    FormRecaptchaComponent,
    FormTextFieldComponent
    
  ],
  exports: [
    FormContainerComponent,
  ],

})
export class FormModule { }
