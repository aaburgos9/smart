import { Component } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mbaas-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.sass']
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
