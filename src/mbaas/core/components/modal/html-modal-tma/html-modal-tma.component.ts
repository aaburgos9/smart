import { Component } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'mbaas-html-modal',
  templateUrl: './html-modal-tma.component.html',
  styleUrls: [
    './html-modal-tma.component.scss'
  ]
})
export class HtmlModalTMAComponent {
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
    setTimeout(() => {
      this.show = true;
    }, 120);
  }

  destroy: any = () => { };

  onClose(i: number) {
    this.data.display = false;
    this.data.buttons[i].callback(i);
    setTimeout(() => {
      this.destroy();
    }, 250);
  }
}
