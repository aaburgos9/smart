import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FieldConfig } from 'src/mbaas/core/components/form/models/field-config.interface';
import { FormContainerComponent } from 'src/mbaas/core/components/form/containers/form-container/form-container.component';
import { FormTypes } from 'src/mbaas/core/components/form/config/form-config';

@Component({
  selector: 'mbaas-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent extends BaseComponent implements OnInit{
  inputResetPassword: FieldConfig[];
  @ViewChild('FormResetPassword', { static: false })
  FormResetPassword: FormContainerComponent;

  ngOnInit(): void {
    this.disableButton = true;
    this.form();
  }


  form(){
    this.inputResetPassword = [{
    name:"correo",
    type: FormTypes.input,
    placeholder: 'Correo electronico',
    label: "Correo electronico",
    inputType: 'email',
    icon: "icon_mail-message-post-send"
  }]
  }
  getDataToResetPassword(){
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
