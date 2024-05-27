import { BaseComponent } from '../../base/base.component';
import { FieldConfig } from 'src/mbaas/core/components/form/models/field-config.interface';
import { FormContainerComponent } from 'src/mbaas/core/components/form/containers/form-container/form-container.component';
import { Menu } from 'src/mbaas/core/components/form/models/menu.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormTypes } from 'src/mbaas/core/components/form/config/form-config';
import { login001Contract } from './login';
import { Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
import { WorkflowService } from 'src/mbaas/core/service/workflow/workflow.service';
import { ONCALL } from 'src/mbaas/mbaas.const';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  inputLogin: FieldConfig[];
  @ViewChild('FormLogin', { static: false })
  FormLogin: FormContainerComponent;
  contract: login001Contract;
  menuSuperior: Menu[];
  menuLateral: Menu[];
  public workflows: WorkflowService;
  public routers: Router;
  // TODO: crear nuevas keys del recaptcha para el dominio con SSL https
  acepted = true;
  loading = false;
  siteKey: string = environment.siteKey;

  ngOnInit(): void {
    this.disableButton = true;
    this.form();


  }


  ngAfterContentChecked(): void {
    this.setFormSubscription(this.FormLogin);
    
  }

  form(): void {
    this.menuSuperior = [
      {
        name: 'Service1',
      },
      {
        name: 'Service2',
      }];
    this.menuLateral = [
      {
        name: 'Service1',
      },
      {
        name: 'Service2',
      },
      {
        name: 'Service3',
      }];

    this.inputLogin = [
      {
        name: 'username',
        type: FormTypes.input,
        placeholder: 'Correo/Telefono',
        label: "Correo o Telefono",
        icon: "icon_user_profile_white",
        errorLabel: 'Ingrese un Usuario Válido',
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
          {
            validator: Validators.minLength(8),
            type: 'maxLength',
            label: 'Este requiere 8 o mas caracteres',

          }
        ],

      },
      {
        name: 'password',
        type: FormTypes.input,
        label: "Contraseña",
        placeholder: "Contraseña",
        inputType: 'password',
        icon: "icon_password_white",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'recapcha',
        type: FormTypes.recaptcha,
        value:'',
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      }
    ]
  }

  setFormSubscription(form: FormContainerComponent): void {
    this.cdr.detectChanges();
    if (form) {
      let previousValid = form.valid;
      form.changes.subscribe(() => {
        if (form.valid !== previousValid) {
          previousValid = form.valid;

          form.setDisabled('submit', !previousValid);
        }
        console.log(this.FormLogin,' aqui::::::')
        this.checkContinueState();
      });
      form.setDisabled('submit', true);
    }
  }

  checkContinueState(): void {
    this.disableButton = this.FormLogin?.valid ? false : true;
  }

  makeContract(): login001Contract {
    this.contract = new login001Contract();
    const data = this.FormLogin.form.value;
    this.contract.userName = data.username;
    // encriptar contraseña Use btoa() for encode and atob() for decode
    this.contract.password = btoa(data.password);
    this.contract.recapcha= data.recapcha;
    return this.contract;
  }

  getDataToLogin(): () => { [key: string]: any } {
    return (): { [key: string]: any } => ({
      ...this.makeContract(),
    });
  }

  gotoRegistration(): void{
    this.routers.navigate([this.workflows.getRoute('MTS001')]).then(() => {
      this.obser.sendData(false, ONCALL);
    });
  }
}
