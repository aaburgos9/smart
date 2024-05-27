//
// Copyright (C) 2024 - Smart Jungle
//

import { AuthService } from './auth.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

describe('Service: AuthService', () => {
  // eslint-disable-next-line prefer-const
  let http: HttpClient;
  const authService = new AuthService(http, null, null);

  it('headerTokenInjector: return http headers', () => {

    // if param is FALSE return header without Authorization
    const myfalse = authService.headerTokenInjector();
    expect(JSON.stringify(myfalse)).toContain('lazyUpdate');

    // if param is TRUE return header within Authorization
    const mytrueNoToken = authService.headerTokenInjector();
    // Undefined if token dont exist
    expect(JSON.stringify(mytrueNoToken)).toContain('lazyUpdate');

    // eslint-disable-next-line max-len
    authService.setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTM2Mjk1MTMsImV4cCI6MTU4NTE2NTk4OCwiYXVkIjoiIiwic3ViIjoiIiwicGFydG5lciI6IkxNIiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIn0.uG9p8SkWJALmEt_6P7neJQtKadyd9itg1Sle233hn7c', false);
    // return header within token in Authorization
    const mytrueYesToken = authService.headerTokenInjector();
    expect(JSON.stringify(mytrueYesToken)).toContain('lazyUpdate');
  });


  it('setClientId', () => {
    authService.setClientId('aaaaa');
    expect(authService).toBeTruthy();
  });

  it('getClientId', () => {
    authService.setClientId('aaaaa');
    const a = authService.getClientId();
    expect(a).toEqual('aaaaa');
  });

  it('setRefreshToken', () => {
    authService.setRefreshToken('aaaaaaaaaaaaaaaaa', false);
    expect(authService).toBeTruthy();
  });

  it('getRefreshToken', () => {
    authService.setRefreshToken('aaaaaaaaaaaaaaaaa', true);
    const a = authService.getRefreshToken();
    expect(a).toEqual('aaaaaaaaaaaaaaaaa');
  });

  it('saveTokenData', () => {
    authService.saveTokenData({access_token: 'a', refresh_token: 'a'}, 'a', false);
    expect(authService).toBeTruthy();
  });

  it('DelecteAllToken', () => {
    authService.deleteAllTokenData();
    expect(authService).toBeTruthy();
  });
});

describe('Auth.Service TestBed', () => {

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: jwtTokenGetter,
          allowedDomains: ['.*']
        }
      })],
    providers: [
      { provide: Router, useValue: mockRouter },
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting()
    ]
  }));

  it('authenticate', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.authenticate('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXI' +
    'iLCJpYXQiOjE1NTM2Mjk1MTMsImV4cCI6MTU4NTE2NTk4OCwiYXVkIjoiIiwic3ViIjoiIiwicGFydG5lciI6IkxNIiwi' +
    'Y2xpZW50SWQiOiIxMjM0NTY3ODkwIn0.uG9p8SkWJALmEt_6P7neJQtKadyd9itg1Sle233hn7c');
    expect(service).toBeTruthy();
  });

  it('getRefreshToken', () => {
    const service: AuthService = TestBed.inject(AuthService);
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.setRefreshToken('TheToken', false);
    const value = service.getRefreshToken();
    expect('TheToken').toEqual(value);
  });

  it('catchErrorCallBack', () => {
    const service: AuthService = TestBed.inject(AuthService);
    // spyOn(TestBed.inject(Router), 'navigate').and.callFake( () => {});
    expect(() => service.catchErrorCallback()('TEST')).toThrow(new Error('error in auth.service.authenticate: TEST'));
  });

  it('decodeToken', () => {
    const service: AuthService = TestBed.inject(AuthService);
    const a = service
    .decodeToken(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIE' +
      'J1aWxkZXIiLCJpYXQiOjE1NTM2Mjk1MTMsImV4cCI6MTU4NTE2NTk4OCwiYXVkIjoi' +
      'Iiwic3ViIjoiIiwicGFydG5lciI6IkxNIiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIn0.uG9p8SkWJALmEt_6P7neJQtKadyd9itg1Sle233hn7c'
      );
    expect(service).toBeTruthy();
  });

  it('reauthenticate', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.reauthenticate();
    expect(service).toBeTruthy();
  });

  it('setAccessToken', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken('a', true);
    expect(service.getAccessToken()).toEqual('a');
  });

  it('AuthService headerTokenInjector true', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(false, false);
    spyOn(localStorage, 'getItem').and.returnValue('true'); //
    service.headerTokenInjector();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjector false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(false, false);
    spyOn(localStorage, 'getItem').and.returnValue('true'); //
    service.headerTokenInjector();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjector false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(undefined, false);
    spyOn(localStorage, 'getItem').and.callFake( () => ''); //
    service.headerTokenInjector();
    expect(service).toBeTruthy();
  });
  // });

  it('AuthService headerTokenInjector false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken('', false);
    spyOn(localStorage, 'getItem').and.callFake( () => ''); //
    service.headerTokenInjector();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjectorMultipart true', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(false, false);
    spyOn(localStorage, 'getItem').and.returnValue('true'); //
    service.headerTokenInjectorMultipart();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjectorMultipart false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(false, false);
    spyOn(localStorage, 'getItem').and.returnValue('true'); //
    service.headerTokenInjectorMultipart();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjectorMultipart false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken(undefined, false);
    spyOn(localStorage, 'getItem').and.callFake( () => ''); //
    service.headerTokenInjectorMultipart();
    expect(service).toBeTruthy();
  });

  it('AuthService headerTokenInjectorMultipart false', () => {
    const service: AuthService = TestBed.inject(AuthService);
    service.setAccessToken('', false);
    spyOn(localStorage, 'getItem').and.callFake( () => ''); //
    service.headerTokenInjectorMultipart();
    expect(service).toBeTruthy();
  });

});
