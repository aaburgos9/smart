import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { FormContainerComponent } from '../../containers/form-container/form-container.component';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { NO, SI } from 'src/mbaas/mbaas.const';


@Component({
  selector: 'mbaas-form-check-opts',
  templateUrl: './form-check-opts.component.html',
  styleUrls: ['./form-check-opts.component.scss']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class FormCheckComponentOpts implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  public stateTagging: string;;

  @ViewChild('childrenContainer', { static: false })
  childrenContainer: FormContainerComponent;

  constructor(
    private obser: SendInformationService<any>
  ) { }

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.stateTagging = 'No';
    this.formControl = this.group.get(formControlName) as FormControl;
  }

  addFunction(): void { }

  setValue(): void {
    this.formControl.setValue(!this.formControl.value);
    this.stateTagging = this.formControl.value ? SI : NO;
  }

  clickEvent() { }

}
