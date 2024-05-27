import { Component, DoCheck, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LOGGER } from 'src/mbaas/mbaas.const';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { Logger } from './logger';

@Component({
  selector: 'mbaas-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent implements OnInit, DoCheck {
  log: Array<Logger>;
  isLogger: boolean;

  keys: string[] = [];

  latestObserValue: any;
  dataObser: any;
  loadObserData = false;

  constructor(
    public logger: SendInformationService<Logger>,
    public obser: SendInformationService<any>
  ) {
    this.log = [];
    this.isLogger = environment.logger;
  }

  ngOnInit() {
    if (this.isLogger) {
      this.logger.getData(LOGGER).subscribe(this.response());
    }
  }

  ngDoCheck(): void {
    this.keys = [];
    for (const key in this.obser.data) {
      if (this.obser.data[key]) {
        this.keys.push(key);
      }
    }
  }

  response(): (response) => void {
    return (response) => {
      if (!response) {
        return;
      }
      response.fecha = new Date();
      this.log.push(response);
    };
  }

  onChange(ev) {
    this.loadObserData = false;
    setTimeout(() => {
      const { value } = ev.target;

      if (typeof value === 'function') {
        this.latestObserValue = 'funcion';
        return;
      }

      this.latestObserValue = JSON.stringify(this.obser.lastValue(value));
      console.log('value in obser: ', this.latestObserValue);
      this.dataObser = { title: value, data: this.latestObserValue };
      this.loadObserData = true;
    }, 0);
  }
}
