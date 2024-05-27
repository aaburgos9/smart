import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendInformationService<T> {

  default: string;
  data: Array<BehaviorSubject<T>> = [];

  constructor() {
    this.default = 'default';
  }

  /**
   *
   * @param data Informción a Enviar
   * @param key Clave de Acceso al Observador
   */
  sendData(data: T, key: string = this.default): void {
    if (!this.data[key]) {
      this.getData(key);
    }
    this.data[key].next(data);
  }

  /**
   * envia null al observador
   * @param key Clave de Acceso al Observador
   */
  clearData(key: string = this.default): void {
    if (!this.data[key]) {
      this.data[key] = new BehaviorSubject<T>(null);
      return;
    }
    this.data[key].next(null);
  }

  /**
   * subscribción al observador y los datos que fluyan por el mismo
   * @param key Clave de Acceso al Observador
   */
  getData(key: string = this.default): Observable<T> {
    if (!this.data[key]) {
      this.data[key] = new BehaviorSubject<T>(null);
    }
    return this.data[key].asObservable();
  }

  /**
   * El observador se Completa en todas sus suscripciones.
   * @param key Clave de Acceso al Observador
   */
  completeData(key: string = this.default): void {
    if (!this.data[key]) {
      return;
    }
    this.data[key].complete();
  }

  // /**
  //  *
  //  * @param err Información del ERROR
  //  * @param key Clave de Acceso al Observador
  //  */
  // errorData(err: any, key: string = this.default): void {
  //   if ( !this.data[key] ) {
  //     return;
  //   }
  //   this.data[key].error(err);
  // }

  /**
   * Acceso a una copia del ultimo valor enviado.
   * @param key Clave de Acceso al Observador
   */
  lastValue(key: string = this.default): T {
    if (!this.data[key]) {
      this.data[key] = new BehaviorSubject<T>(null);
    }
    return this.data[key].getValue();
  }

  /**
   * Cancela la subscripción
   * @param observador subscripcion
   */
  unSubscribe(observador: Subscription): void {
    try {
      observador.unsubscribe(); 
    } catch (error) {
      console.log('Observer Undefined: ', error);
    }
  }
}
