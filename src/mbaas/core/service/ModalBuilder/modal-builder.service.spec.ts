import { TestBed, waitForAsync } from '@angular/core/testing';

import { ModalBuilderService } from './modal-builder.service';
import { SendInformationService } from '../SendInformation/send-information.service';
import { ModalModule } from '../../components/modal/modal.module';
import {
  ACTIONFROMSTEP,
  CANAL,
  MODULO,
  KIND,
  PAIS,
  LENGUAJE,
  LOGGER,
  MODAL,
  ACTIONAPPFINISH,
  SELECTSEGURO,
  CALLBACK_WF,
  CANALES } from 'src/mbaas/mbaas.const';

describe('ModalBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SendInformationService,
      ModalBuilderService
    ]
  }));

  it('should be created 37', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(37)
      .withArgs(MODULO).and.returnValue('SOAT')
      .withArgs(KIND.KEY).and.returnValue('SOAT')
      .withArgs(PAIS).and.returnValue('CO')
      .withArgs(LENGUAJE).and.returnValue('ES')
      .withArgs(LOGGER).and.returnValue('Test Logger')
      .withArgs(MODAL).and.returnValue('{ }');
    expect(service).toBeTruthy();
  });

  it('should be created 16', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(16)
      .withArgs(MODULO).and.returnValue('SOAT')
      .withArgs(KIND.KEY).and.returnValue('SOAT')
      .withArgs(PAIS).and.returnValue('CO')
      .withArgs(LENGUAJE).and.returnValue('ES')
      .withArgs(LOGGER).and.returnValue('Test Logger')
      .withArgs(MODAL).and.returnValue('{ }');
    expect(service).toBeTruthy();
  });

  it('should be created 21', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(16)
      .withArgs(MODULO).and.returnValue('SOAT')
      .withArgs(KIND.KEY).and.returnValue('SOAT')
      .withArgs(PAIS).and.returnValue('CO')
      .withArgs(LENGUAJE).and.returnValue('ES')
      .withArgs(LOGGER).and.returnValue('Test Logger')
      .withArgs(MODAL).and.returnValue('{ }');
    expect(service).toBeTruthy();
  });

  it('getModalData', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONFROMSTEP);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONAPPFINISH);
    TestBed.inject(SendInformationService).sendData((item) => {}, SELECTSEGURO);
    spyOn(window, 'open').and.returnValue({} as any);
    service.getModalData({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      }]
    }, 2).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 3).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 4).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 5).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('getModalData', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONFROMSTEP);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONAPPFINISH);
    TestBed.inject(SendInformationService).sendData((item) => {}, SELECTSEGURO);
    spyOn(window, 'open').and.returnValue({} as any);
    service.getModalData({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      }]
    }, 2).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 3).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 4).buttons[0].callback((() => {}));
    service.getModalData({
      title: '',
      message: '',
      buttons: [{}]
    }, 5).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test redirectTo', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    service.redirecTo({
      title: '',
      message: '',
      buttons: [{
        callback: 'url'
      }]
    }).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test getData', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONFROMSTEP);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONAPPFINISH);
    TestBed.inject(SendInformationService).sendData((item) => {}, SELECTSEGURO);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(16)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    spyOn(window, 'open').and.returnValue({} as any);
    service.getModalData({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      }]
    }, 2).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test getData', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONFROMSTEP);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONAPPFINISH);
    TestBed.inject(SendInformationService).sendData((item) => {}, SELECTSEGURO);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(37)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    console.log(CANALES);
    spyOn(window, 'open').and.returnValue({} as any);
    service.getModalData({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      }]
    }, 2).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test getData', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONFROMSTEP);
    TestBed.inject(SendInformationService).sendData((item) => {}, ACTIONAPPFINISH);
    TestBed.inject(SendInformationService).sendData((item) => {}, SELECTSEGURO);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(21)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    console.log(CANALES);
    spyOn(window, 'open').and.returnValue({} as any);
    service.getModalData({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      }]
    }, 2).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test simple', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(37)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    console.log(CANALES);
    spyOn(window, 'open').and.returnValue({} as any);
    service.simple({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      },
      {
        callback: ''
      }]
    }).buttons[0].callback((() => {}));
    expect(service).toBeTruthy();
  });

  it('test html', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(37)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    console.log(CANALES);
    spyOn(window, 'open').and.returnValue({} as any);
    service.html({
      title: '',
      message: '',
      buttons: [{
        callback: ''
      },
      {
        callback: ''
      }]
    });
    expect(service).toBeTruthy();
  });

  it('test updateMsg', () => {
    const service: ModalBuilderService = TestBed.inject(ModalBuilderService);
    spyOn(TestBed.inject(SendInformationService), 'lastValue')
      .withArgs(CANAL).and.returnValue(37)
      .withArgs(CALLBACK_WF).and.returnValue('url');
    console.log(CANALES);
    spyOn(window, 'open').and.returnValue({} as any);
    const msg='error';
    const data= {message: 'msg'}

    service.updateMsg(msg,data)
    expect(service).toBeTruthy();
  });

});
