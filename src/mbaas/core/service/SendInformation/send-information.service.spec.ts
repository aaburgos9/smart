import { TestBed } from '@angular/core/testing';

import { SendInformationService } from './send-information.service';
import { PAYLOAD } from 'src/mbaas/mbaas.const';

describe('SendInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    expect(service).toBeTruthy();
  });

  it('const default = "default"', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    expect(service.default).toEqual('default');
  });

  it('sendData that no exist', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.sendData({});
    service.sendData({}, 'default');
    expect(service.default).toEqual('default');
  });

  it('sendData that exist', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.getData();
    service.sendData({ valor: true });
    service.sendData({ valor: true }, 'default');
    expect(service).toBeTruthy();
  });

  it('sendData that exist 2', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.getData().subscribe( response => {
      console.log(response);
    });
    service.getData();
    service.sendData({ valor: true });
    service.sendData({ valor: true }, 'default');
    service.sendData(null);
    service.sendData( true );
    service.getData().subscribe( response => {
      console.log(response);
    });
    expect(service).toBeTruthy();
  });

  it('getData with Key', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.getData(PAYLOAD);
    service.getData('xxx');
    console.log(service.data.length);
    expect(service).toBeTruthy();
  });

  it('getData without Key', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.getData();
    expect(service).toBeTruthy();
  });

  it('clearData', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.getData();
    service.clearData();
    expect(service).toBeTruthy();
    expect(service).toBeTruthy();
    service.clearData(PAYLOAD);
    expect(service).toBeTruthy();
  });

  it('completeData 1', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    const obs = service.getData().subscribe( response => {
      console.log('obs');
    });
    service.completeData();
    expect(service).toBeTruthy();
  });

  it('completeData 2', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    const obs = service.getData('Payload').subscribe( response => {
      console.log('obs');
    });
    service.completeData('Payload');
    expect(service).toBeTruthy();
  });

  it('completeData 3', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.completeData();
    expect(service).toBeTruthy();
  });

  it('completeData 4', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.completeData(PAYLOAD);
    expect(service).toBeTruthy();
  });

  it('Unsubscribe', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    const obs = service.getData().subscribe( (item) => {});
    service.unSubscribe(obs);
    expect(service).toBeTruthy();
  });

  it('lastValue 1', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    const obs = service.getData().subscribe( (item) => {});
    expect(service.lastValue()).toEqual(null);
  });

  it('lastValue 2', () => {
    const service: SendInformationService<any> = TestBed.inject(SendInformationService);
    expect(service.lastValue()).toEqual(null);
  });

});
