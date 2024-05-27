import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountFormat'
})
export class AccountFormat implements PipeTransform {
  public transform(value: any): string {
    const data = '****' + value.substring(value.length - 4, value.length);
    return data;
  }

}
