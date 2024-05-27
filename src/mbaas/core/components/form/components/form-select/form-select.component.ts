import { AfterContentChecked, Component, Inject, LOCALE_ID } from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'mbaas-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['form-select.component.scss']
})
export class FormSelectComponent implements Field, AfterContentChecked {
  config: FieldConfig;
  group: FormGroup;
  alreadySetted = false;
  saldoFormatted: string;

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  ngAfterContentChecked(): void {
    if (!this.alreadySetted) {
      if ( this.config.disabled ) {
        this.group.get(this.config.name).disable();
      }
      if ( this.config.value ) {
        this.group.get(this.config.name).setValue(this.config.value);
        this.alreadySetted = true;
      }
    }
    if (this.config.saldo) {
      this.saldoFormatted = formatNumber(this.config.saldo, this.locale, '1.0-0').replace(/,/gi, '.');
    }
  }
}
