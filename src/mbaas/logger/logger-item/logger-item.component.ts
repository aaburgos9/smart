import { Component, OnInit, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mbaas-logger-item',
  templateUrl: './logger-item.component.html',
  styleUrls: ['./logger-item.component.scss'],
})
export class LoggerItemComponent implements OnInit {
  @Input() data: any;
  dataProcessed = false;
  cloneData: any;

  constructor() {}

  ngOnInit() {
    const dataString = JSON.stringify(this.data);
    this.cloneData = JSON.parse(dataString);
    this.traverse(this.cloneData, this.process).then(() => {
      this.dataProcessed = true;
    });
  }

  traverse(obj: any, func: any) {
    return new Promise<void>(async (resolve) => {
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          obj[i] = func(obj[i]);
          if (obj[i] !== null && typeof obj[i] === 'object') {
            await this.traverse(obj[i], func);
          }
        }
      }
      resolve();
    });
  }

  process(value: any) {
    if (typeof value !== 'object' && typeof value === 'string') {
      value = value.replace(/(.{100})..+/, '$1…');
    }
    return value;
  }

  copy(data: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(data);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
