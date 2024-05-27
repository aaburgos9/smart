import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MODULO, CANAL, ZONE, KIND, LENGUAJE, PAIS, MODAL, DATATAGGING, EXTERNA, INTERNA, MODULO_PRODUCT, MESSAGE_MODAL, TITLE_MODAL, ORIGEN, BTN_MODAL, PRODUCTO, CANALES } from 'src/mbaas/mbaas.const';
import { KINDS } from 'src/mbaas/mbaas.kind.const';
import { Modal } from '../../components/modal/modal';
import { CatalogoService } from '../catalogo/catalogo.service';
import { SendInformationService } from '../SendInformation/send-information.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio Para Google Tag Manager (GTM):
 * Este servicio tiene la responsabilidad de cargar el catalogo correspondiente a cada producto
 * y usarlo para enviar cada tag que corresponda segun la configuracion.
 */
export class GtmService {
  // varaible para almacenar el psao actual
  private currentStep: string;
  // variable que almacena el objeto de catalogo
  private tagging: any;

  constructor(
    private obser: SendInformationService<any>,
    private catalogo: CatalogoService,
    private title: Title
  ) {
    // se almacena el modal como paso actual en caso de iniciar con uno
    this.currentStep = this.obser.lastValue(MODAL);
    // subscripcion al objeto modal en caso que tenga eventos en catalogo
    this.obser.getData(MODAL).subscribe((modal: Modal) => {
      // si el modal es definido y tiene nombre para identificarlo
      if (modal) {

        this.setDataTagging(MESSAGE_MODAL, modal.message);
        this.setDataTagging(TITLE_MODAL, modal.title);

        if (modal.nameComponent) {
          // se usa el nombre del modal como currentStep
          this.currentStep = modal.nameComponent;
          // logueamos el estado
          console.log('::: MODAL :::', this.currentStep);
        }
      }
    });
    // se realiza una subscripcion al modulo en caso de que se cambie
    this.obser.getData(MODULO).subscribe((module: string) => {
      // en este caso hay que eliminar el taggin actual para que se vuelva
      // a llamar el catalogo con el nuevo modulo
      this.tagging = undefined;
    });
  }

  /**
   * Funcion encargada de setear el valor del step actual
   * @param step string valor actual del step de la pantalla
   */
  setStep(step: string) {
    // asignacion para el step actual
    this.currentStep = step;
    console.log('::: STEP :::', this.currentStep);
  }

  /**
   * Funcion encargada de cargar el taggin plan correspondiente al modulo
   * @returns Observable returna el objeto de la peticion a catalogo
   */
  private loadTagging(): Observable<any> {
    // inicializacion del objeto de parametros
    let params: Params = {};
    // array con los nombres de los parametros para la peticion
    const keys = [MODULO, PAIS, LENGUAJE, KIND.KEY, CANAL];
    // si se setteo un modulo
    if (this.obser.lastValue(MODULO)) {
      // se convierte el array de nombres en sus valores
      // almacenados en los objetos
      keys.map(item => {
        params[item] = this.obser.lastValue(item);
        return item;
      });
      // caso en el que modulo se indefinido
    } else {
      // setteo de parametros por defecto
      params = {
        modulo: 'smart-jungle-peacock',
        pais: 'CO',
        lenguaje: 'ES',
        canal: 37,
        kind: 'crrt'
      };
    }
    params.limit = -1;
    // se retorna el Observable de la peticion a catalogo
    return this.catalogo.data(KINDS.TAGGING_PLAN, params).pipe(
      // mapeamos el valor ya que el resultado es un array con una posicion
      map(tagging => {
        this.tagging = tagging[0];
      })
    );
  }

  /**
   * Funcion encargada de formatear y enviar el tag correspondiente segun el step
   * @param taggingConf Object Opcional: si requiere ua configuracion especial
   * @param taggingKey String nombre del taggin obtenido del setep actual
   * @returns void - no retorna nada
   */
  private sendTag(taggingConf: any, taggingKey: string, taggingValue?: string) {
    // se busca el valor de canal
    const canal = CANALES[this.obser.lastValue(CANAL)];
    if (this.obser.lastValue(MODAL))
    this.setDataTagging(BTN_MODAL, this.obser.lastValue(MODAL).buttons[taggingConf].buttonText);
    // se busca la definicion de zona si existe
    const zone = this.obser.lastValue(ZONE) ? EXTERNA : INTERNA;
    const product = this.tagging.productos[this.obser.lastValue(MODULO_PRODUCT)] ?? this.obser.lastValue(MODULO_PRODUCT);
    this.setDataTagging(PRODUCTO, product);
    // Logs
    console.log('sendTag');
    console.log(zone, this.currentStep, taggingConf);
    console.log(this.tagging);
    // se extrae del objeto de catalogo el plan que le corresponde a la pantalla actual
    let tagging = this.tagging[zone].plan[this.currentStep];
    let taggingStep = this.tagging[zone].plan[this.currentStep];
    // if para evaluar tagging para el paso actual
    if (tagging) {
      // si el taggin existe se extrae el valor segun la accion
      tagging = tagging[taggingConf];
    }

    // if para evaluar tagging para taggingConf
    if (tagging) {
      // casos de error con la configuracion enviada
      if (typeof tagging.accion === 'object') {
        if (!taggingKey) {
          console.error('Tagging Error: no llego el "taggingKey"');
          return;
        }
        if (!tagging.accion[taggingKey]) {
          console.error(`Tagging Error: no existe taggingKey: ${taggingKey} en ${taggingConf} para ${this.currentStep}`);
          return;
        }
      }

      // se captura el error de undefined
      if (typeof tagging.accion === 'object' && !taggingKey) { }

      const event = tagging.event ? tagging.event : this.tagging[zone].descripcion;
      const zona = zone === INTERNA ? this.tagging[zone].descripcion_zona_int : this.tagging[zone].descripcion_zona_ext;
      const titulo_pantalla = this.replaceTaggingLabel(taggingStep.title, this.obser.lastValue(DATATAGGING));
      const accion = tagging.accion;

      // se crea el objeto de tag a ser enviado al dataLayer
      let pagePath = '';
      let pageTitle = '';
      let tag = {
        event,
        canal,
        zona,
        titulo_pantalla,
        accion
      };
      const gtmTagTittle = {
        'event': 'Pageview',
        pagePath,
        pageTitle
      };

      if (tagging.adicional) {
        if (this.obser.lastValue(MODAL)){
          this.setDataTagging(BTN_MODAL, this.obser.lastValue(MODAL).buttons[taggingConf].buttonText);
          this.setDataTagging(ORIGEN, pageTitle);
          delete tag.titulo_pantalla;
        }
        tag = Object.assign({}, tag, this.addAdicionalObjectGTM(Object.assign({}, tagging.adicional), this.obser.lastValue(DATATAGGING)));
      }

      if (tagging.pagePath) {
        gtmTagTittle.pagePath = this.replaceTaggingLabel(tagging.pagePath, this.obser.lastValue(DATATAGGING));
        gtmTagTittle.pageTitle = this.replaceTaggingLabel(tagging.pageTitle, this.obser.lastValue(DATATAGGING));
      } else {
        gtmTagTittle.pagePath = this.replaceTaggingLabel(taggingStep.pagePath, this.obser.lastValue(DATATAGGING));
        gtmTagTittle.pageTitle = this.replaceTaggingLabel(taggingStep.pageTitle, this.obser.lastValue(DATATAGGING));
      }

      this.title.setTitle(gtmTagTittle.pageTitle);
      window.dataLayer.push(gtmTagTittle);
      setTimeout(() => {
        window.dataLayer.push(tag);
        console.groupCollapsed("GTM send");
        console.log("Path: " + gtmTagTittle.pagePath)
        console.log("Title: " + gtmTagTittle.pageTitle)
        console.log('Window dataLayer:', tag);
        console.groupEnd();
      }, 150);
      // se hace push a dataLayer del objeto de tag

    } else {
      // se captura el error
      console.error(`No se encontró tagging para zona: ${zone}, step: ${this.currentStep}, valor: ${taggingConf}`);
    }
  }

  /**
   * Funcion encargada de la creacion e inicializacion del taggin
   * @param taggingConf Objeto de seleccion del taggin
   * @param taggingKey String llave del taggin
   */
  createGtm(taggingConf: any, taggingKey?: string, taggingValue?: string) {
    // si el taggin existe si no se llama de catalogo
    if (this.tagging) {
      this.sendTag(taggingConf, taggingKey, taggingValue);
    } else {
      this.loadTagging().subscribe(() => this.sendTag(taggingConf, taggingKey, taggingValue));
    }
  }

  /**
   * Metodo que reemplaza en un texto
   * los datos parametricos de un objeto para GTM
   * @param text
   * @param object
   * @returns
   */
  replaceTaggingLabel(text: string, object: {[key:string]: any}): string {
    let result = text;
    for (const aux in object){
      result = result.replace(new RegExp(`{{\\s*${aux}\\s*}}`, 'g'), object[aux]);
    }
    return result;
  }

  /**
   * Metodo para setear objeto de GTM Parametrico
   * @param key
   * @param value
   */
  setDataTagging(key: string, value: string): void {
    let data = this.obser.lastValue(DATATAGGING);
    if (!data) {
      data = {};
    }
    data[key] = value;
    this.obser.sendData(data, DATATAGGING);
  }

  /**
   * Metodo que agrega dinamicamente tags adicionales a los base
   * ( event, canal, zona, titulo_pantalla, accion)
   * @param tagging
   * @param object
   * @returns
   */
  addAdicionalObjectGTM(tagging: { [key: string]: any }, object: { [key: string]: any }) {
    for (const aux in tagging) {
      tagging[aux] = this.replaceTaggingLabel(tagging[aux], object);
    }
    return tagging;
  }

}
