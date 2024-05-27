import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { LENGUAJE, MODULO, PAIS, PROPERTY } from '../../../../mbaas.const';
import { SendInformationService } from '../../../service/SendInformation/send-information.service';
import { CatalogoService } from '../../../service/catalogo/catalogo.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Catalogo } from '../models/catalogo.enum';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormDataService {

  constructor(
    private catalogo: CatalogoService,
    private obser: SendInformationService<any>,
  ) { }

  params(keys: Array<string>): Params {
    const params: Params = {};
    keys.map(item => {
      params[item] = this.obser.lastValue(item);
      return item;
    });
    if (!params.limit) {
      params.limit = '-1';
    }
    return params;
  }

  loadData(query: Catalogo) {
    if ( query.length > 0 && (typeof query === 'string')) {
      return this.catalogo.data(query, this.params([PAIS, MODULO, LENGUAJE])).pipe(
        tap(value => console.log('predictive list service data', value)),
        catchError(err => {
          throw new Error('error in source. predictive list service Details: ' + err);
        })
      );
    }
    return;
  }

  loadDataByFilter(KEY: string, value: string, property: string): Observable<any> {
    /* const split0Length = value.split(':')[0].length;
     const split1Length = value.split(':')[1].length;*/
    // || (value.split(':')[0].length > 0 && value.split(':')[1].length > 0) perteneciente al if
    /* if ((property !== 'ICD' && value)) { } */
    this.obser.sendData(property, PROPERTY);
    const params = this.params([PAIS, MODULO, LENGUAJE, PROPERTY]);
    return this.catalogo.data(`${KEY}/${value}`, params);
  }
}
