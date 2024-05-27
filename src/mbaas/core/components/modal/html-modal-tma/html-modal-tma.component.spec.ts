import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { HtmlModalTMAComponent } from './html-modal-tma.component';
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
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';

describe('AlertModalTMAComponentHTML', () => {
  let component: HtmlModalTMAComponent;
  let fixture: ComponentFixture<HtmlModalTMAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HtmlModalTMAComponent
      ],
      imports: [ButtonContinueModule,
        ButtonBackModule,
        RouterTestingModule,
        PipeModuleModule,
        DirectivesModule,
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
    fixture = TestBed.createComponent(HtmlModalTMAComponent);
    component = fixture.componentInstance;

    spyOn(TestBed.inject(CriptoService), 'unencrypter').and.returnValue(new Promise(resolve => { }));
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    let newComponent = new HtmlModalTMAComponent();
    tick(220);
    expect(newComponent.show).toBeTruthy();
  }));

  it('test destroy', () => {
    component.destroy();
    expect(component).toBeTruthy();
  });

  it('test destroy', () => {
    component.data.buttons[0].callback = (close: any) => { };
    component.onClose(0);

    expect(component).toBeTruthy();
  });


});
