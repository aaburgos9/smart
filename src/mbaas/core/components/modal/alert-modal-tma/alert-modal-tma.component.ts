import { Component, Output } from '@angular/core';
import { Modal } from '../modal';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { MODAL_VALUE } from 'src/mbaas/mbaas.const';

@Component({
  selector: 'mbaas-alert-modal',
  templateUrl: './alert-modal-tma.component.html',
  styleUrls: [
    './alert-modal-tma.component.scss'
  ]
})
export class AlertModalTMAComponent {

  private obser: SendInformationService<string> = new SendInformationService();

  data: Modal = {
    buttons: [
      {
        callback: null,
        buttonText: ''
      }
    ],
    title: '',
    message: '',
    display: false,
    entryComponent: null
  };
  show: boolean;

  constructor() {
    setTimeout( () => {
      this.show = true;
    }, 120);
  }

  destroy: any = () => {};

  onClose(valueTex) {
    return () => {
      this.data.display = false;
      setTimeout( () => {
        this.destroy();
      }, 250);
      return valueTex;
    };
  }

}
