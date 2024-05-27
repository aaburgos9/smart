import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'point'
})
export class PointSeparatorPipe implements PipeTransform {
  public transform(value: any, simbol?: string): string {
    simbol = simbol ? simbol : '.';
    // Elimina decimales
    let data = value.toString().replace(/(\.[0-9]*)$/g, '');
    // Agrega separador de miles
    data = data.replace(/\B(?=(\d{3})+(?!\d))/g, `${simbol}`);
    return data;
  }

}
