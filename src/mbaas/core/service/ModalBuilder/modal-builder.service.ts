import { Injectable } from '@angular/core';
import { SendInformationService } from '../SendInformation/send-information.service';
import { ACTIONFROMSTEP, CANAL, CANALES, CALLBACK_WF, SELECTSEGURO, ACTIONAPPFINISH } from 'src/mbaas/mbaas.const';
import { Modal } from '../../components/modal/modal';
import { AlertModalTMAComponent } from '../../components/modal/alert-modal-tma/alert-modal-tma.component';
import { HtmlModalTMAComponent } from '../../components/modal/html-modal-tma/html-modal-tma.component';


@Injectable({
  providedIn: 'root'
})
export class ModalBuilderService {

  constructor(
    private actionStep: SendInformationService<(item) => void>,
    private obser: SendInformationService<any>
  ) { }

  getModalData(response: any, errorType: any, data: any = {}): Modal {
    return {
      2: (response: any) => this.redirecToWfCallback(response),
      3: (response: any) => this.simple(response),
      4: (response: any) => this.actionFromStep(response, data),
      5: (response: any) => this.actionFromStepPost(response, data),
    }[errorType](response, data);
  }

  redirecToWfCallback(response: any): Modal {
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.class = 'button button--primary';
        const url = this.obser.lastValue(CALLBACK_WF);
        if (this.obser.lastValue(CANAL) !== CANALES.WEB && this.obser.lastValue(CANAL) !== CANALES.APP) {
          item.callback = (close: any) => {
            close();
          };
        }
        if (this.obser.lastValue(CANAL) === CANALES.WEB) {
          item.callback = (close: any) => {
            window.open(url || '', '_blank');
            close();
          };
        }
        if (this.obser.lastValue(CANAL) === CANALES.APP) {
          item.callback = (close: any) => {
            // redirect por PostMessage
            close();
          };
        }
        return item;
      }),
      title: response.title,
      message: response.message,
      entryComponent: AlertModalTMAComponent
    };
  }

  redirecTo(response: any): Modal {
    console.log(response);
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.class = 'button button--primary';
        const url = item.callback.toString();
        item.callback = (close: any) => {
          window.open(url || '', '_blank');
          close();
        };
        return item;
      }),
      title: response.title,
      message: response.message,
      entryComponent: AlertModalTMAComponent
    };
  }

  simple(response: any): Modal {
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.class = 'button button--primary';
        item.callback = (close: any) => close();
        return item;
      }),
      title: response.title,
      message: response.message,
      entryComponent: AlertModalTMAComponent
    };
  }

  html(response: any): Modal {
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.class = item.class ? item.class : 'button button--primary';
        return item;
      }),
      content: response.content,
      title: '',
      message: '',
      nameComponent: response.component ? response.component : response.nameComponent,
      entryComponent: HtmlModalTMAComponent
    };
  }

  actionFromStep(response: any, data: any): Modal {
    console.log('build modal::', response);
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.class = 'button button--primary';
        item.callback = (close: any) => this.actionStep.lastValue(ACTIONFROMSTEP)(close);
        return item;
      }),
      title: response.title,
      message: response.message,
      payload: data,
      nameComponent: response.component ? response.component : response.nameComponent,
      entryComponent: AlertModalTMAComponent
    };
  }

  actionFromStepPost(response: any, data?: any): Modal {
    console.log('build modal::', response, 'data::', data);
    return {
      display: true,
      buttons: response.buttons.map((item: any) => {
        item.callback = (close: any) => this.actionStep.lastValue(ACTIONAPPFINISH)(close);
        return item;
      }),
      title: response.title,
      message: response.message,
      payload: data,
      postmessage: response.postmessage,
      nameComponent: response.component ? response.component : response.nameComponent,
      entryComponent: AlertModalTMAComponent
    };
  }

  updateMsg(msg: string, data: any): string {
    let mssg = msg;
    for (const item in data) {
      console.log('item::', item);
      for (const key of Object.keys(data)) {
        item === key ?
          mssg = mssg.replace(item, data[key]) : mssg = mssg;
      }
    }
    return mssg;
  }

}
