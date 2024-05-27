import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormContainerComponent } from '../../containers/form-container/form-container.component';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';

@Component({
  selector: 'mbaas-form-group-check',
  templateUrl: './form-group-check.component.html',
  styleUrls: ['./form-group-check.component.scss']
})
export class FormGroupCheckComponent implements Field, OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  private arregloFormArray: Array<any> = [];
  // private obser: SendInformationService<any>;

  constructor(
    private obser: SendInformationService<any>) { }

  @ViewChild('childrenContainer', { static: false })
  childrenContainer: FormContainerComponent;

  @Output() valueChkGroup = new EventEmitter<any>();

  nameChkGroup = 'no inicializada';

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
    // this.formControl.setValue(this.arregloFormArray ? this.arregloFormArray : null);
  }

  setValue(value: any, isChecked: boolean): void {
    if (this.formControl.value && this.formControl.value.length >= 1) {
      this.arregloFormArray = this.formControl.value;
    }
    if (isChecked) {
      this.arregloFormArray.push(value);
      // this.formControl.setValue(this.arregloFormArray);
    } else {
      const index = this.arregloFormArray.indexOf(value);
      this.arregloFormArray.splice(index, 1);
    }
    this.formControl.setValue(this.arregloFormArray);
  }

  setNameChkGroup(name: string): void {
    // console.log('Se presiono texto: ', name);
    this.nameChkGroup = name;
    this.obser.sendData(this.nameChkGroup, 'nameCheckBox');
  }

}
