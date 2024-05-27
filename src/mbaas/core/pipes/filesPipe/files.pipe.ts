import { Pipe, PipeTransform } from '@angular/core';
import {CANAL, KIND, LENGUAJE, MODULO, PAIS } from 'src/mbaas/mbaas.const';
import { BaseComponent } from '../../../page/base/base.component';

@Pipe({
  name: 'Files'
})

export class FilesPipe extends BaseComponent implements PipeTransform {

  async transform(value: any) {
   return await this.getFile(value).then(res=>res);
  }

  async getFile(value: any){
    return new Promise(resolve =>{
      this.catalogo.assetsText(
        value, Object.assign(this.params([PAIS, MODULO, LENGUAJE, CANAL, KIND.KEY]))
      ).subscribe(res=>resolve(res));
    });
  }

}
