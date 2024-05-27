import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicForm } from '../../models/dinamic-form.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';


import { SendInformationService } from '../../../../service/SendInformation/send-information.service';
import { DynamicFormDataService } from '../../services/dynamic-form-data.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CatalogoData } from '../../models/catalogo-data.interface';
import { ADDRESS_CONTROL } from 'src/mbaas/mbaas.const';

@Component({
  selector: 'mbaas-form-addres',
  templateUrl: './form-addres.component.html',
  styleUrls: ['./form-addres.component.scss']
})
export class FormAddresComponent implements OnInit, DynamicForm, OnDestroy {
  public config: FieldConfig;
  public group: FormGroup;
  public formAddresFormGroup: FormGroup;
  public tipoViaConfig: FieldConfig;
  public secondInputConfig: FieldConfig;
  public thirdInputConfig: FieldConfig;
  public fourthInputConfig: FieldConfig;

  public firstInputData = [];
  public secondInputData = [];
  public thirdInputData = [];

  public showInput123: string;
  private respaldo = '';
  public fieldValidity = false;


  private subscriptions: Subscription[] = [];

  catalogoData: CatalogoData;
  estateInput = false;
  validArray = [];

  constructor(
    private obser: SendInformationService<any>,
    private dynamicFormDataService: DynamicFormDataService
  ) { }

  ngOnInit() {
    const formAddresFormName = this.config.name;
    const children: FieldConfig[] = this.config.children;
    this.formAddresFormGroup = this.group.get(formAddresFormName) as FormGroup;
    // if (children.length !== 1) {
    //   throw new Error('La configuracion es incorrecta, por favor verifique que la propiedad children tenga 3 objectos');
    // }
    this.tipoViaConfig = children[0];
    this.secondInputConfig = children[1];
    this.thirdInputConfig = children[2];
    this.fourthInputConfig = children[3];

    this.obser.getData(ADDRESS_CONTROL).subscribe(
      (value) => {
        this.changeOption(value);
      });
    }

  loadData() {
    if (this.dynamicFormDataService.loadData(this.tipoViaConfig.data)) {
      this.dynamicFormDataService.loadData(this.tipoViaConfig.data).subscribe(
        response => this.firstInputData = response
      );
    }
  }

  onFirstInputChange() {
    this.formAddresFormGroup.get(this.secondInputConfig.name).setValue('');
    this.formAddresFormGroup.get(this.thirdInputConfig.name).setValue('');
    const firstFormControlName = this.tipoViaConfig.name;
    const firstControl = this.formAddresFormGroup.get(firstFormControlName);
    const value = firstControl.value;
    const { key, property } = this.tipoViaConfig.catalogoFilter;
    this.dynamicFormDataService.loadDataByFilter(key, value, property).subscribe(
      response => this.secondInputConfig = response
    );
  }

  getFormGroup() {
    return this.formAddresFormGroup;
  }

  onSecondInputChange() {
    this.formAddresFormGroup.get(this.thirdInputConfig.name).setValue('');
    const firstFormControlName = this.tipoViaConfig.name;
    const firstControl = this.formAddresFormGroup.get(firstFormControlName);
    const secondFormControlName = this.tipoViaConfig.name;
    const secondControl = this.formAddresFormGroup.get(secondFormControlName);
    const { key, property } = this.secondInputConfig.catalogoFilter;
    const value = firstControl.value + ':' + secondControl.value;
    this.dynamicFormDataService.loadDataByFilter(key, value, property).subscribe(
      response => this.thirdInputData = response
    );
  }

  loadDataByFilter(key: string, value: string, property: string): void {
    const subscriptions = this.dynamicFormDataService.loadDataByFilter(key, value, property)
      .pipe(map(response => response.map((p: any) => Object.assign({ value: p.codigo, label: p.nombre }))))
      .subscribe(response => this.catalogoData = response);
    this.subscriptions.push(subscriptions);
  }

  ngOnDestroy(): void {
    try {
      this.subscriptions.forEach(subscription => subscription.unsubscribe()); 
    } catch (error) {
      console.log('Element Undefined: ', error);
    }
  }

  changeOption(value: any) {
    if (value === 'otro') {
      this.disableControls(this.config.children);
    } else {
      this.enableControls(this.config.children);
    }
    this.showInput123 = value;
  }

  disableControls(childrens: any[]): void {
    for (const element of childrens) {
      if (element.name !== 'tipoVia') {
        this.formAddresFormGroup.get(element.name).disable();
      }
    }
  }

  enableControls(childrens: any[]): void {
    for (const element of childrens) {
      this.formAddresFormGroup.get(element.name).enable();
      this.formAddresFormGroup.get(element.name).valueChanges.subscribe(() => {
        this.validArray[element.name] = this.formAddresFormGroup.get(element.name).invalid;
      });
    }
  }

  validField(name: string): boolean {
    if (this.config.failBorder && this.estateInput) {
      return this.validArray[name];
    }
    return false;
  }

  inputState(): void {
    this.estateInput = true;
  }

}
