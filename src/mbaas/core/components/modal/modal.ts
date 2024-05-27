
import { Type } from '@angular/core';
import { AlertModalTMAComponent } from './alert-modal-tma/alert-modal-tma.component';
import { InfoModalTMAComponent } from './info-modal-tma/info-modal-tma.component';
import { HtmlModalTMAComponent } from './html-modal-tma/html-modal-tma.component';

export interface Payload {
  message: string;
  adquirir?: boolean;
  ofrecerEcard?: boolean;
  solicitudTarjeta?: boolean;
  proteccionTarjeta?: {
    valorCobertura: string,
    primaMensual: string;
    alternativa: string;
  }[];
  seguroVida?: {
    minimo: string;
    maximo: string;
    planes: {
      minimo: string;
      maximo: string;
      primaAnual: string;
    }[]
  };
}

export interface Modal {
  buttons: Array<{
    callback: (close: any) => void;
    buttonText: string;
    class?: string;
    name?: string;
  }>;
  title: string;
  message: string;
  class?: string;
  display: boolean;
  dataComponent?: any;
  nameComponent?: any;
  payload?: any;
  postmessage?: any;
  content?: string;
  entryComponent: Type<AlertModalTMAComponent | InfoModalTMAComponent | HtmlModalTMAComponent>;
}

export interface ModalMessage {
  buttons: Array<{
    callback: (close: any) => void;
    buttonText: string;
    class?: string;
    name?: string;
  }>;
  title: string;
  message: BenefitsModal;
  class?: string;
  display: boolean;
  dataComponent?: any;
  nameComponent?: any;
  payload?: any;
  postmessage?: any;
  content?: string;
  productFamily?:string;
  entryComponent: Type<AlertModalTMAComponent | InfoModalTMAComponent | HtmlModalTMAComponent>;
}

export interface BenefitsModal {
  showButtonClose: boolean;
  titulo: string;
  descripcion: string;
  listaBeneficios: Array<{
    img: string;
    description: string;
  }>;
  buttonText: string;
}

export interface ModalResponse {
  buttons: Array<{
    callback: string;
    buttonText: string;
  }>;
  title: string;
  message: string;
}
