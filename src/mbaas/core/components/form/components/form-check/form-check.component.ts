import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { FormContainerComponent } from '../../containers/form-container/form-container.component';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { AUTH_VIEW } from 'src/mbaas/mbaas.const';

@Component({
  selector: 'mbaas-form-check',
  templateUrl: './form-check.component.html',
  styleUrls: ['./form-check.component.scss']
})
export class FormCheckComponent implements OnInit, AfterViewInit {
  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;

  @ViewChild('childrenContainer', { static: false })
  childrenContainer: FormContainerComponent;

  @ViewChild('checkboxContainer', { static: false })
  childrenContainerClass: ElementRef;

  constructor(
    public obser: SendInformationService<any>
  ) { }

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
  }

  ngAfterViewInit(): void {
    const elementText = this.childrenContainerClass.nativeElement;
  }

  clickEvent() {
    const value = this.obser.lastValue(AUTH_VIEW);
    this.obser.sendData(!value, AUTH_VIEW);
  }

  setValue(): void {
    this.formControl.setValue(!this.formControl.value);
  }
}
