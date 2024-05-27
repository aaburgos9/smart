import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfoModalTMAComponent } from './info-modal-tma.component';
import { PassSecurityTrustPipe } from 'src/mbaas/core/pipes/passSecurityTrust/pass-security-trust.pipe';
import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
import { ButtonContinueModule } from '../../button-continue/button-continue.module';
import { ButtonBackModule } from '../../button-back/button-back.module';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CatalogoService } from 'src/mbaas/core/service/catalogo/catalogo.service';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { PointSeparatorPipe } from 'src/mbaas/core/pipes/pipeSeparator/point-separator.pipe';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';

describe('InfoModalTMAComponent', () => {
  let component: InfoModalTMAComponent;
  let fixture: ComponentFixture<InfoModalTMAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InfoModalTMAComponent
      ],
      imports: [ButtonContinueModule,
        ButtonBackModule,
        PipeModuleModule,
        RouterTestingModule,
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
        CatalogoService,
        SendInformationService,
        CriptoService,
        CatalogoService,
        PointSeparatorPipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModalTMAComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.inject(CriptoService), 'unencrypter').and.returnValue( new Promise( resolve => {} ) );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onClose', (done) => {
    component.onClose()();
    setTimeout(() => {
      expect(component).toBeTruthy();
      done();
    }, 300);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

});
