import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { Modal } from './modal';
import { ComponentRef } from '@angular/core';
import { CriptoService } from '../../service/encryption/cripto.service';
import { ButtonContinueModule } from '../button-continue/button-continue.module';
import { ButtonBackModule } from '../button-back/button-back.module';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CatalogoService } from '../../service/catalogo/catalogo.service';
import { SendInformationService } from '../../service/SendInformation/send-information.service';
import { PointSeparatorPipe } from '../../pipes/pipeSeparator/point-separator.pipe';
import { PassSecurityTrustPipe } from '../../pipes/passSecurityTrust/pass-security-trust.pipe';
import { PipeModuleModule } from '../../pipes/pipe-module.module';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent
      ],
      imports: [ButtonContinueModule,
        ButtonBackModule,
        RouterTestingModule,
        PipeModuleModule,
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
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    spyOn(TestBed.inject(CriptoService), 'unencrypter').and.returnValue( new Promise( resolve => {} ) );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#response', () => {
    const resp1: any = {
      buttons: [
        {
          callback: null,
          buttonText: ''
        }
      ],
      title: '',
      message: '',
      display: false,
      entryComponent: null
    };
    spyOn(component.entry, 'createComponent').and.returnValue({
      instance: {
        data: {}
      }
    }as ComponentRef<any>);
    spyOn((component as any).resolver, 'resolveComponentFactory').and.callFake(() => {});
    component.response()(resp1);
    expect(component).toBeTruthy();
  });

  it('destroy', () => {
    component.componentRef = { destroy: () => {} };
    component.destroy()();
    expect(component).toBeTruthy();
  });
});
