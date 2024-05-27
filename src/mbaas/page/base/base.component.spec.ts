import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpRequest, HttpParams, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { initTraslate, jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
import { CatalogoService } from 'src/mbaas/core/service/catalogo/catalogo.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MODULO, PAIS, STEP_ID } from 'src/mbaas/mbaas.const';
import { GtmService } from 'src/mbaas/core/service/gtm/gtm.service';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BaseComponent],
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
      providers: [
        SendInformationService,
        CriptoService,
        CatalogoService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    component.gtmService = TestBed.inject(GtmService);
    spyOn(component.gtmService, 'createGtm').and.callFake(() => {});
    window.dataLayer = { push: () => {} };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test onCall', () => {
    component.onCall(data => data = {});
    expect(component).toBeTruthy();
  });

  it('should test params', () => {
    const par = component.params([MODULO, PAIS, STEP_ID]);
    expect(par).toEqual({modulo: null, pais: null, step: null});
  });

  it('should test server enrolment key', () => {
    const par = component.serverEnrollmentKey;
    expect(par).toEqual(null);
  });

  it('should test set server enrolment key', () => {
    component.serverEnrollmentKey = 'somekeyvalue';
    const par = component.serverEnrollmentKey;
    expect(par).toEqual('somekeyvalue');
  });

  it('should test is descktop device', () => {
    const par = component.isDesktopDevice;
    expect(par).toBeTruthy();
  });

  it('should test save images', () => {
    const par = component.saveImages({});
    expect(par).toBeTruthy();
  });

  it('should test get client id', () => {
    const par = component.getClientId();
    expect(par).toEqual(null);
  });

  it('should test set title', () => {
    component.setTitle('title');
    expect(component).toBeTruthy();
  });

  it('should test app finish', () => {
    component.appFinish('OK', 200);
    expect(component).toBeTruthy();
  });

  it('should test limpiar add body class', () => {
    const par = component.addBodyClass('some&nbsp;key&nbsp;value');
    expect(component).toBeTruthy();
  });

  it('should test limpiar remove body class', () => {
    const par = component.removeBodyClass('some&nbsp;key&nbsp;value');
    expect(component).toBeTruthy();
  });

  it('should test getDocumentTypeByCode', () => {
    component.getDocumentTypeByCode([
      {
          enable: true,
          value: "00",
          label: "SIN TIPO DOCUMENTO"
      }], "00");
    expect(component).toBeTruthy();
  });

});
