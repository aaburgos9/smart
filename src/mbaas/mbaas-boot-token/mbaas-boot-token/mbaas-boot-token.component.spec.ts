import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MbaasBootTokenComponent } from './mbaas-boot-token.component';
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

describe('MbaasBootTokenComponent', () => {
  let component: MbaasBootTokenComponent;
  let fixture: ComponentFixture<MbaasBootTokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MbaasBootTokenComponent],
      imports: [RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: initTraslate,
            deps: [HttpClient]
          }
        }),
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
    fixture = TestBed.createComponent(MbaasBootTokenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('successAuthenticate 1', () => {
  //   spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => {});
  //   component.successAuthenticate()({
  //     state: 0
  //   });
  //   expect(component).toBeTruthy();
  // });

  // it('successAuthenticate 2', () => {
  //   spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => {});
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
  //   spyOn(TestBed.inject(Router), 'navigate').and.callFake(() => {});
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
