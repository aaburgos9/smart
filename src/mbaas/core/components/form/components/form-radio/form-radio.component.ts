import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormContainerComponent } from '../../containers/form-container/form-container.component';

@Component({
  selector: 'mbaas-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['form-radio.component.scss']
})
export class FormRadioComponent implements Field, OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  seeMore: boolean = false;
  seeMoreText: string;


  @ViewChild('childrenContainer', {static: false}) childrenContainer: FormContainerComponent;

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
    this.seeMore = false;
    this.seeMoreText = 'Leer más';
  }

  toogleText() {
    this.seeMore = !this.seeMore;
    this.seeMoreText = this.seeMore ? this.config.seeMoreText.less : this.config.seeMoreText.more;
  }
}
