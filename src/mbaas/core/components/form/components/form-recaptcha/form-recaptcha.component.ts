import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'mbaas-form-recaptcha',
  templateUrl: './form-recaptcha.component.html',
  styleUrls: ['./form-recaptcha.component.scss']
})
export class FormRecaptchaComponent implements OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  // Captcha
  captchaSiteKey: string = environment.siteKey;
  ngOnInit() {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
  }
}