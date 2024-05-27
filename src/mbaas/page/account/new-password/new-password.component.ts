import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FieldConfig } from 'src/mbaas/core/components/form/models/field-config.interface';
import { FormContainerComponent } from 'src/mbaas/core/components/form/containers/form-container/form-container.component';
import { FormTypes } from 'src/mbaas/core/components/form/config/form-config';
import { Validators } from '@angular/forms';
import { TextfieldTypes } from 'src/mbaas/interfaces/textfield.enum';

@Component({
  selector: 'mbaas-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent extends BaseComponent implements OnInit {
  inputNewPassword: FieldConfig[];
  @ViewChild('FormNewPassword', { static: false })
  FormNewPassword: FormContainerComponent;

  ngOnInit(): void {
    this.disableButton = true;
    this.form();
  }


  form() {
    this.inputNewPassword = [
      {
        name: "newPassword",
        type: FormTypes.textField,
        placeholder: 'introduce la nueva contraseña',
        label: "Nueva Contraseña",
        inputType: 'password',
        icon: "icon_mail-message-post-send"
      },
      {
        name: "RepitPassword",
        type: FormTypes.textField,
        placeholder: 'Vuelve a introducir la nueva contraseña',
        label: "Repita la contraseña",
        inputType: 'password',
        icon: "icon_mail-message-post-send"
      },
      {
        name: "phone",
        type: FormTypes.input,
        inputType: 'tel',
        label: "Teléfono",
      },
      {
        type: FormTypes.textField,
        name: 'ingresoOtp',
        label:'Codigo de verificación',
        textfieldType: TextfieldTypes.PASSWORD_NOT_DO_SHOW,
        validation: [
          {
            validator: Validators.required,
            type: 'required',
            label: 'Este campo es requerido.',
          },
          {
            validator: this.validationCustom.minLength(8),
            type: 'required',
            label: 'Este campo es requerido.',
          },
          {
            validator: this.validationCustom.maxLength(8),
            type: 'required',
            label: 'Este campo es requerido.',
          },
        ],
      },
    ]
  }
  getDataToNewPassword() {
    //   this.obser.sendData(
    //     this.modalBuilder.getModalData(
    //       this.catErrorIngresos,
    //       3,
    //       this.configView.montos[0].labelMaximo
    //     ),
    //     MODAL
    //   );
  }

}
