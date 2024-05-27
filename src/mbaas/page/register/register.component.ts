
import { FieldConfig } from 'src/mbaas/core/components/form/models/field-config.interface';
import { FormContainerComponent } from 'src/mbaas/core/components/form/containers/form-container/form-container.component';
import { Menu } from 'src/mbaas/core/components/form/models/menu.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormTypes } from 'src/mbaas/core/components/form/config/form-config';
import { register001Contract } from './register';
import { Validators } from '@angular/forms';
import { WorkflowService } from 'src/mbaas/core/service/workflow/workflow.service';
import { MBAAS_STEPS, ONCALL, STEP_ID } from 'src/mbaas/mbaas.const';
import { Router } from '@angular/router';
import { BaseComponent } from '../base/base.component';

@Component({
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {
  inputRegister: FieldConfig[];
  @ViewChild('FormRegister', { static: false })
  FormRegister: FormContainerComponent;
  contract: register001Contract;
  menuSuperior: Menu[];
  menuLateral: Menu[];
  public workflows: WorkflowService;
  public routers: Router;
  ngOnInit(): void {
    this.disableButton = true;
    this.form();
  }

  ngAfterContentChecked(): void {
    this.setFormSubscription(this.FormRegister);
  }

  form(): void {
    this.inputRegister = [
      {
        name: 'nombre',
        type: FormTypes.textField,
        placeholder: 'Primer Nombre',
        label: "Primer Nombre",
        orientation: "horizontal",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'segundoNombre',
        type: FormTypes.textField,
        placeholder: 'Segundo Nombre',
        label: "Segundo Nombre",
        orientation: "horizontal",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'apellido',
        type: FormTypes.textField,
        placeholder: 'Primer Apellido',
        label: "Primer Apellido",
        orientation: "horizontal",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'segundoApellido',
        type: FormTypes.textField,
        placeholder: 'Segundo Apellido',
        label: "Segundo Apellido",
        orientation: "horizontal",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      }
      ,
      {
        name: 'correo',
        type: FormTypes.input,
        inputType: "email",
        placeholder: 'help@help.com',
        label: "Correo",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'telefono',
        type: FormTypes.input,
        inputType:"tel",
        placeholder: 'Teléfono',
        label: "Teléfono",
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
      {
        name: 'contraseña',
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
        // 8 aurorisacion de datos
        type: FormTypes.checkButton,
        name: 'autorizacion',
        checkedBox: false,
        checkLabel: {
          initLabel: 'Acepto los',
          actionLabel: 'Terminos y Condiciones  y Politicas de privacidad ',
          endLabel: 'al registrarme',
        },
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },

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
        this.checkContinueState();
      });
      form.setDisabled('submit', true);
    }
  }

  checkContinueState(): void {
    this.disableButton = this.FormRegister?.valid ? false : true;
  }

  makeContract(): register001Contract {
    this.contract = new register001Contract();
    const data = this.FormRegister.form.value;
    this.contract.userName = data.username;
    // encriptar contraseña Use btoa() for encode and atob() for decode
    this.contract.password = btoa(data.password);
    this.contract.recapcha= data.recapcha;
    return this.contract;
  }

  getDataToRegister(): () => { [key: string]: any } {
    return (): { [key: string]: any } => ({
      ...this.makeContract(),
    });
  }


  regresarLogin(){
    this.obser.sendData(MBAAS_STEPS.LOGIN001.STEP, STEP_ID);
  }
}
