import { Component, OnInit } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'mbaas-info-modal-tma',
  templateUrl: './info-modal-tma.component.html',
  styleUrls: [
    './info-modal-tma.component.scss'
  ]
})
export class InfoModalTMAComponent {

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
    setTimeout( () => this.show = true, 120);
  }

  destroy: any = () => {};

  onClose() {
    return () => {
      this.data.display = false;
      setTimeout( () => {
        this.destroy();
      }, 250);
    };
  }

}
