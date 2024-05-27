import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MbaasBootComponent } from './mbaas-boot.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { initTraslate, jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
import { AuthService } from 'src/mbaas/core/service/authentication/auth.service';
import { WorkflowService } from 'src/mbaas/core/service/workflow/workflow.service';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MBAAS_ROUTING, MBAAS_STEPS } from 'src/mbaas/mbaas.const';
import { ForbiddenComponent } from 'src/mbaas/forbidden/forbidden/forbidden.component';
import { MTS001Component } from '../../page/mts001/mts001.component';

describe('MbaasBootComponent', () => {
  let component: MbaasBootComponent;
  let fixture: ComponentFixture<MbaasBootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MbaasBootComponent],
      imports: [RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: initTraslate,
            deps: [HttpClient]
          }
        }),
        RouterTestingModule.withRoutes([{
          path: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.MTS001}`,
          component: MTS001Component
        },
          {
            path: 'forbidden',
            component: ForbiddenComponent
          }]),
        JwtModule.forRoot({
          config: {
            tokenGetter: jwtTokenGetter,
            allowedDomains: ['.*']
          }
        })],
      providers: [
        WorkflowService,
        CriptoService,
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbaasBootComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  // it('successAuthenticate 1', () => {
  //   spyOn(TestBed.inject(Router), 'navigate').and.stub();
  //   component.successAuthenticate()({
  //     state: 0
  //   });
  //   expect(component).toBeTruthy();
  // });

  // it('successAuthenticate 2', () => {
  //   spyOn(TestBed.inject(Router), 'navigate').and.stub();
  //   spyOn(TestBed.inject(AuthService), 'decodeToken').and.returnValue('aaaa');
  //   spyOn(TestBed.inject(CriptoService), 'getKeysRemote').and.returnValue(of('aaaa').toPromise());

  //   component.successAuthenticate()({
  //     state: 1,
  //     access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIE' +
  //     'J1aWxkZXIiLCJpYXQiOjE1NTM2Mjk1MTMsImV4cCI6MTU4NTE2NTk4OCwiYXVkIjoi' +
  //     'Iiwic3ViIjoiIiwicGFydG5lciI6IkxNIiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIn0.uG9p8SkWJALmEt_6P7neJQtKadyd9itg1Sle233hn7c'
  //   });
  //   expect(component).toBeTruthy();
  // });

  // it('errorAuthenticate 1', () => {
  //   // spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => {});
  //   component.errorAuthenticate()({
  //     state: 1,
  //     access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIE' +
  //     'J1aWxkZXIiLCJpYXQiOjE1NTM2Mjk1MTMsImV4cCI6MTU4NTE2NTk4OCwiYXVkIjoi' +
  //     'Iiwic3ViIjoiIiwicGFydG5lciI6IkxNIiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIn0.uG9p8SkWJALmEt_6P7neJQtKadyd9itg1Sle233hn7c'
  //   });
  //   expect(component).toBeTruthy();
  // });

  // it('errorAuthenticate 1', () => {
  //   const a = component.saveLocalStorage('Product_template');
  //   expect(a).toBeTruthy();
  // });
});
