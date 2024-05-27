import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ForbiddenComponent } from 'src/mbaas/forbidden/forbidden/forbidden.component';
import { MODAL } from 'src/mbaas/mbaas.const';
import { initTraslate, jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { AuthService } from '../authentication/auth.service';
import { CriptoService } from '../encryption/cripto.service';
import { PostMessagesService } from '../postMessages/post-messages.service';
import { SendInformationService } from '../SendInformation/send-information.service';
import { ThemeServiceService } from '../themeService/theme-service.service';
import { WorkflowService } from '../workflow/workflow.service';

import { BootResolverServiceService } from './boot-resolver-service.service';
import { Results } from '../../../interfaces/Results.interface';

describe('BootResolverServiceService', () => {
  let service: BootResolverServiceService;
  let routerSpy: { navigate: jasmine.Spy };
  let stateRouteSpy: { state: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: '/forbidden',
        component: ForbiddenComponent
      }]),
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
        AuthService,
        CriptoService,
        WorkflowService,
        SendInformationService,
        PostMessagesService,
        ThemeServiceService,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRouteSnapshot, useValue: { params: { otp: 'value' } } },
        { provide: RouterStateSnapshot, useValue: stateRouteSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    service = new BootResolverServiceService(
      TestBed.inject(Router),
      TestBed.inject(AuthService),
      TestBed.inject(CriptoService),
      TestBed.inject(WorkflowService),
      TestBed.inject(SendInformationService),
      TestBed.inject(TranslateService),
      TestBed.inject(SendInformationService),
      TestBed.inject(PostMessagesService),
      TestBed.inject(ThemeServiceService)
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test for service resolve', () => {
    const activatinRoute = new ActivatedRouteSnapshot();
    activatinRoute.params = { otp: 'otp' };
    expect(service.resolve(activatinRoute, null)).toEqual({});
  });

  it('test for service resolve else', () => {
    const activatinRoute = new ActivatedRouteSnapshot();
    activatinRoute.params = {};
    expect(service.resolve(activatinRoute, null)).toEqual({});
  });

  it('test for successAuthenticate', () => {
    spyOn(TestBed.inject(AuthService), 'decodeToken').and.returnValue('token');
    spyOn(TestBed.inject(CriptoService), 'getKeysRemote').and.returnValue(Promise.resolve(true));
    const success = service.successAuthenticate();
    success({ state: 1 });
    expect(service).toBeTruthy();
  });

  it('test for successAuthenticate fail getKeysRemote', () => {
    spyOn(TestBed.inject(AuthService), 'decodeToken').and.returnValue('token');
    spyOn(TestBed.inject(CriptoService), 'getKeysRemote').and.returnValue(Promise.reject());
    const success = service.successAuthenticate();
    success({ state: 1 });
    expect(service).toBeTruthy();
  });

  it('test for successAuthenticate fail STATUS', () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    spyOn(TestBed.inject(AuthService), 'decodeToken').and.returnValue('token');
    spyOn(TestBed.inject(CriptoService), 'getKeysRemote').and.returnValue(Promise.resolve(true));
    const success = service.successAuthenticate();
    success({ state: 0 });
    expect(service).toBeTruthy();
  });

  it('test for successGetKeyRemote', () => {
    spyOn(TestBed.inject(CriptoService), 'keyCreator').and.returnValue(Promise.resolve(true));
    const successGetKey = service.successGetKeyRemote('token', { otp: '' }, {});
    successGetKey('key');
    expect(service).toBeTruthy();
  });

  it('test for successGetKeyRemote fail keyCreator', () => {
    spyOn(TestBed.inject(CriptoService), 'keyCreator').and.returnValue(Promise.reject());
    const successGetKey = service.successGetKeyRemote('token', { otp: '' }, {});
    successGetKey('key');
    expect(service).toBeTruthy();
  });

  xit('test for successKeyCreator', () => {
    const successFunction = service.successKeyCreator({ product: 'TEST_EXAMPLE_83', sub: 'dasdasd-asdasd-asdasdas-dasd' }, {}, {});
    successFunction('key');
    expect(service).toBeTruthy();
  });

  it('test for saveLocalStorage', () => {
    service.saveLocalStorage('Product_template');
    expect(service).toBeTruthy();
  });

  it('test for saveLocalStorage if', () => {
    service.saveLocalStorage('other');
    expect(service).toBeTruthy();
  });

  it('test for updateMessage', () => {
    service.updateMessage({ message: 'el numero de [cuenta] es:', payload: { cuenta: 1234567891011 } });
    expect(service).toBeTruthy();
  });

  it('test for updateMessage else ', () => {
    service.updateMessage({ message: 'el numero de cuenta es:', payload: { cuenta: 1234567891011 } });
    expect(service).toBeTruthy();
  });

  it('test for errorAuthenticate', () => {
    const errorFunction = service.errorAuthenticate();
    expect(errorFunction('Error')).toBeUndefined();
  });

  it('test for service callAction', () => {
    spyOn(service['guard'], 'lastValue').withArgs(MODAL).and.returnValue({ postmessage: 'catPOST_MSG', token: false });
    spyOn(service['postMessage'], 'callPostMessage').and.returnValue();
    const callFunction = service.callAction();
    callFunction((close) => { });
    expect(service).toBeTruthy();
  });

  it('should test add theme for channel valid ', () => {
    const channel ='vaidChannel'
    spyOn(service['themeService'], 'addTheme');
    spyOn(service['themeService'], 'removeTheme');
    const Results= service.callTheme(channel);
    expect(service['themeService'].addTheme).toHaveBeenCalledWith(channel);
    expect(service['themeService'].removeTheme).toHaveBeenCalled();
    expect(Results).toBe(true);
    });

    it('should test add theme for channel false ', () => {

      spyOn(service['themeService'], 'addTheme');
      spyOn(service['themeService'], 'removeTheme');
      const Results= service.callTheme('');
      expect(service['themeService'].addTheme).toBeTruthy();
      expect(service['themeService'].removeTheme).toBeTruthy();
      expect(Results).toBe(false);
      });

});
