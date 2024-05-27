import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { FormContainerComponent } from '../../containers/form-container/form-container.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mbaas-form-toggle',
  templateUrl: './form-toggle.component.html',
  styleUrls: ['./form-toggle.component.sass']
})
export class FormToggleComponent implements OnInit, AfterViewInit, OnDestroy {

  public config: FieldConfig;
  public group: FormGroup;
  public childs: FieldConfig[];

  public checkboxToggle = false;
  private subscriptions: Subscription[] = [];

  @ViewChild(FormContainerComponent, {static: false}) childrenContainer: FormContainerComponent;

  constructor() { }

  ngOnInit() {
    this.childs = this.config.children;
  }

  ngAfterViewInit(): void {
    const form = this.childrenContainer.form;
    const formGroupName = this.config.name;
    const subscription = form.valueChanges
      .subscribe(value => this.group.get(formGroupName).setValue(value));
    this.subscriptions.push(subscription);
  }

  onCheckboxToggle() {
    this.checkboxToggle = !this.checkboxToggle;
    const name = this.config.name;

    if (!this.checkboxToggle) {
      this.group.get(name).disable();
    } else {
      this.group.get(name).enable();
    }
  }

  ngOnDestroy(): void {
    try {
      this.subscriptions.forEach(subscription => subscription.unsubscribe()); 
    } catch (error) {
      console.log('Element Undefined: ', error);
    }
  }

}
