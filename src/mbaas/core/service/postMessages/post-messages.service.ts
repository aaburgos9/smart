import { Injectable } from '@angular/core';
import { LOGGER, NAVIGATE, PAIS, MODULO, LENGUAJE, KIND, POST_TOKEN, CANAL } from '../../../mbaas.const';
import { SendInformationService } from '../SendInformation/send-information.service';
import { PostMessagesReq } from '../../models/biometria/post-messages.model';
import { CatalogoService } from '../catalogo/catalogo.service';

@Injectable({
  providedIn: 'root',
})
export class PostMessagesService {
  constructor(private obser: SendInformationService<any>, private catalogo: CatalogoService) {
    this.addListener();
  }

  /**
   * Función encargada de agregar el EventListener para los postMessages
   *  de respuesta de la App.
   */
  addListener() {
    window.addEventListener('message', (event) => {
      console.log('>>>>>>>>>> respuesta de anfitrion', event);
      this.obser.sendData({ title: 'BIOMETRIA - postmessage', data: event.data }, LOGGER );
      const POST_MESSAGE_NAME = event.data.fnCallback;
      const POST_MESSAGE_RESPONSE = event.data;
      this.obser.sendData(POST_MESSAGE_RESPONSE, POST_MESSAGE_NAME);
    });
  }

  /**
   * Función que se encarga de traer el catalogo del postMessage y ejecutar
   * la función postMessageEmitter para enviarlo a la App.
   * @param postName string Nombre del catalogo que contiene la data basica para
   *  el PostMessage.
   * @param specificDataMessage Objeto con la informacion adicional o local
   *  que se debe enviar en el postMessage en Message.
   */
  getAndSendPostMessages(postName: string, specificDataMessage: any) {
    const dataFilter = {
      modulo: this.obser.lastValue(MODULO) ? this.obser.lastValue(MODULO) : 'MNUING',
      pais: this.obser.lastValue(PAIS) ? this.obser.lastValue(PAIS) : 'CO',
      lenguaje: this.obser.lastValue(LENGUAJE) ? this.obser.lastValue(LENGUAJE) : 'ES',
      kind: this.obser.lastValue(KIND.KEY) ? this.obser.lastValue(KIND.KEY) : 'proceso-menuexterno',
      canal: this.obser.lastValue(CANAL) ? this.obser.lastValue(CANAL) : '37'
    };
    this.catalogo.data(postName, Object.assign({ limit: -1 }, dataFilter )).subscribe((response) => {
      specificDataMessage.token = this.obser.lastValue(POST_TOKEN);
      response[0].message = Object.assign( response[0].message, specificDataMessage );
      const data: PostMessagesReq = response[0];
      this.postMessageEmitter(data);
    }, () => {
      throw new Error(
        'Este catalogo: ' + postName + ' no existe con las siguientes caracteristicas: ' +
          JSON.stringify(dataFilter)
      );
    });
  }

  direction(
    url: string,
    status: string = 'redirect',
    statusCode: number = 200,
    statusMessage: string = 'Ok'
  ) {
    this.postMessageEmitter({
      fn: NAVIGATE,
      message: {
        direction: status,
        redirectUrl: url,
        statusCode,
        statusMessage,
        statusFinish: 1
      },
    });
  }

  /**
   * Función encargada de recibir un objeto para enviar por postMessages
   * @param postMessage Objeto que contiene la función y el mensaje a ser enviado.
   */
  callPostMessage(postMessage: any) {
    postMessage.message.token = this.obser.lastValue(POST_TOKEN);
    this.postMessageEmitter(postMessage);
  }

  /**
   * Función encargada de hacer el llamado de la función de window postMessage.
   * @param message Objeto que contiene la función y el mensaje a ser enviado.
   */
  postMessageEmitter(message: any) {
    window.parent.postMessage(message, '*');
  }

}
