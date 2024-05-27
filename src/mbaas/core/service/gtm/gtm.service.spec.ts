import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CANAL, DATATAGGING, MODAL, ZONE } from 'src/mbaas/mbaas.const';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { CriptoService } from '../encryption/cripto.service';
import { SendInformationService } from '../SendInformation/send-information.service';

import { GtmService } from './gtm.service';

describe('GtmService', () => {

  const mockData = [
    {
      "productos": {
        "CDT": "CDT Digital"
      },
      "int": {
        "descripcion": "Prevalidaciones",
        "descripcion_zona_int": "Privada",
        "descripcion_zona_ext": "Pública",
        "plan": {
          "cdt010": {
            "pagePath": "/apertura-de-producto",
            "pageTitle": "{{producto}} - Apertura de producto",
            "title": "apertura de producto: {{producto}}",
            "pageView": {
              "accion": "Pageview",
              "adicional": {
                "nombre_empresa": "{{nombreEmpresa}}",
                "representante_legal": "{{representanteLegal}}"
              }
            },
            "0": {
              "accion": "Click",
              "event": "modales transversales",
              "adicional": {
                "titulo_modal": "{{titleModal}}",
                "datos_representante_legal": "{{datosRepLegal}}",
                "descripcion_modal": "{{messageModal}}",
                "origen_modal": "{{origen}}",
                "nombre_boton": "{{nombrebtn}}"
              }
            },
            "continuar": {
              "accion": "Click",
              "adicional": {
                "nombre_boton": "continuar",
                "datos_representante_legal": "{{datosRepLegal}}",
                "autorizacion_manejo_datos": "{{tycDatos}}",
                "nombre_empresa": "{{nombreEmpresa}}",
                "representante_legal": "{{representanteLegal}}",
                "codigo_asesor": "{{codigoAsesor}}"
              }
            },
            "datosRepLegal": {
              "accion": "Click",
              "adicional": {
                "nombre_boton": "Datos Representante legal correcto:{{datosRepLegal}}"
              }
            },
            "tycDatos": {
              "accion": "Click",
              "adicional": {
                "nombre_boton": "Autorización de Información -Check Box aceptado"
              }
            }
          }
        }
      },
      "ext": {
        "plan": {},
        "descripcion": "Prevalidaciones",
        "descripcion_zona_int": "Privada",
        "descripcion_zona_ext": "Pública"
      }
    }
  ];

  const mockDataBranch =[
    {
        "productos": {
            "CDT": "CDT Digital"
        },
        "int": {
            "descripcion": "Prevalidaciones",
            "descripcion_zona_int": "Privada",
            "descripcion_zona_ext": "Pública",
            "plan": {
                "cdt010": {
                    "pagePath": "/apertura-de-producto",
                    "pageTitle": "{{producto}} - Apertura de producto",
                    "title": "apertura de producto: {{producto}}",
                    "pageView": {
                      "accion": {
                        "item": "value"
                        },
                        "adicional": {
                            "nombre_empresa": "Opcion seleccionada: {{categoria}}",
                            "representante_legal": "{{representanteLegal}}"
                        }
                    }
                }
            }
        },
        "ext": {
            "plan": {},
            "descripcion": "Prevalidaciones",
            "descripcion_zona_int": "Privada",
            "descripcion_zona_ext": "Pública"
        }
    }
];


  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: jwtTokenGetter,
          allowedDomains: ['.*']
        }
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: initTraslate,
          deps: [HttpClient]
        }
      })],
    providers: [SendInformationService, CriptoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
  }));

  it('should be created', () => {
    const service: GtmService = TestBed.inject(GtmService);
    expect(service).toBeTruthy();
  });

  it('test para modal', () => {
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData({nameComponent: 'name'}, MODAL);
    const service: GtmService = TestBed.inject(GtmService);
    expect(service).toBeTruthy();
  });

  it('test para setStep', () => {
    const service: GtmService = TestBed.inject(GtmService);
    service.setStep('cdt010');
    expect(service).toBeTruthy();
  });

  it('test para createGtm', () => {
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data zona int', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data zona int branch accion object', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockDataBranch[0];
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data zona int branch accion object with key', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockDataBranch[0];
    service.setStep('cdt010');
    service.createGtm('pageView', 'key');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data zona int branch taggin with pagePath', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockDataBranch[0];
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data zona ext', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(true, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data error configKey', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(37, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('otracosa');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data taggingKey', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(37, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('pageView');
    expect(service).toBeTruthy();
  });

  it('test para sendTag con data taggingKey error', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('pageView', 'error');
    expect(service).toBeTruthy();
  });

  it('test para createGtm con data adicional y MODAL', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    obser.sendData({
      "display": true,
      "buttons": [
        {
          "buttonText": "Aceptar",
          "class": "smart-button--enterpriseButton"
        }
      ],
      "title": "Límite de intentos superados",
      "message": "Usted superó la cantidad de procesos de retoma",
      "payload": {
        "message": "catCDTE_MSJ03",
        "canal": "21",
        "lenguaje": "ES",
        "modulo": "CDTE",
        "pais": "CO",
        "token": "XXXXXXXXXXXXXXXXXXXX",
        "userId": "abcd-12345-fghij-12"
      }
    }, MODAL);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('0');
    expect(service).toBeTruthy();
  });


  it('test para createGtm con data taggingKey error no existe', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData(21, CANAL);
    obser.sendData(false, ZONE);
    const service: GtmService = TestBed.inject(GtmService);
    spyOn(window.dataLayer, 'push').and.returnValue((ele) => {});
    service['tagging'] = mockData[0];
    service.setStep('cdt010');
    service.createGtm('pageView', 'error');
    expect(service).toBeTruthy();
  });

  it('test para setDataTagging with data', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    obser.sendData({"ruta": "producto"}, DATATAGGING);
    const service: GtmService = TestBed.inject(GtmService);
    service.setDataTagging("producto", "Inversiones");
    expect(service).toBeTruthy();
  });

  it('test para setDataTagging without data', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    const service: GtmService = TestBed.inject(GtmService);
    service.setDataTagging("producto", "Inversiones");
    expect(service).toBeTruthy();
  });

  it('test para replaceTaggingLabel', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    const service: GtmService = TestBed.inject(GtmService);
    service.replaceTaggingLabel("Opcion seleccionada: {{producto}}", {"producto": "Inversiones"});
    expect(service).toBeTruthy();
  });

  it('test para addAdicionalObjectGTM', () => {
    window.dataLayer = { push: function() {} }
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    const service: GtmService = TestBed.inject(GtmService);
    service.addAdicionalObjectGTM({
      "nombre_boton": "Opcion seleccionada: CDT Digital",
      "ruta": "Inversiones"
    }, { "producto": "Inversiones" });
    expect(service).toBeTruthy();
  });

});
