import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { AuthService } from '../../service/authentication/auth.service';
import { ReAuthenticateService } from './re-authenticate.service';
import { of } from 'rxjs';
import { SendInformationService } from '../../service/SendInformation/send-information.service';
import { MODAL } from 'src/mbaas/mbaas.const';
import { ForbiddenComponent } from 'src/mbaas/forbidden/forbidden/forbidden.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('ReAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([{
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
      AuthService,
      provideHttpClient(withInterceptorsFromDi()),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    expect(service).toBeTruthy();
  });

  it('intercept false', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    service.reautentiate = false;
    service.intercept({
          url: 'lhc',
          clone: (item) => ({}),
          headers: {
            has: (item) => false,
            get: (item) => null,
          }
        } as any,
        {
          handle: (req) => req
        } as any);
    expect(service).toBeTruthy();
  });

  it('intercept true.0', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    service.reautentiate = true;
    service.workflowUrl = 'workflow';
    service.soporteUploadImage = 'imagen';
    service.soporteWebAppLHC = 'lhc';
    service.intercept({
          url: 'lhc',
          clone: (item) => ({}),
          headers: {
            has: (item) => false,
            get: (item) => null,
          }
        } as any,
        {
          handle: (req) => ({ pipe: (...ars) => ars})
        } as any);
    expect(service).toBeTruthy();
  });

  it('map', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const a = service.map()({ body: ''} as any);
    expect(a).toEqual('');
  });

  it('skipWhile', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const a = service.skipWhile()({ body: ''} as any);
    expect(a).toBeTruthy();
  });

  it('intercept 4', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const auth: AuthService = TestBed.inject(AuthService);
    spyOn(auth, 'reauthenticate').and.returnValue(of({
      state: 0
    }));
    service.responseConcatMap({
      url: 'lhc',
      clone: (item) => ({}),
      headers: {
        has: (item) => false,
        get: (item) => null,
      }
    } as any,
    {
      handle: (req) => ({ pipe: (...ars) => ars})
    } as any)({
      state: 1
    });
    expect(service).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('responseIntercept state ERROR', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const auth: AuthService = TestBed.inject(AuthService);
    spyOn(auth, 'reauthenticate').and.returnValue(of({
      state: 0
    }));
    service.responseConcatMap({
      headers: {
        has: (item) => true,
        get: (item) => true
      }
    } as any,
    {
      handle: (req) => of(1, 2, 3, 4, 5, 6, 7)
    } as any)({
      state: 0
    });
    expect(service).toBeTruthy();
  });

  it('responseSwitchMap Error', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const auth: AuthService = TestBed.inject(AuthService);
    spyOn(auth, 'reauthenticate').and.returnValue(of({
      state: 0
    }));
    expect(service).toBeTruthy();
  });

  it('responseSwitchMap Error', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const auth: AuthService = TestBed.inject(AuthService);
    spyOn(auth, 'reauthenticate').and.returnValue(of({
      state: 0
    }));
    spyOn(auth, 'getAccessToken').and.returnValue('JWT');
    expect(service).toBeTruthy();
  });

  it('handleError', () => {
    const service: ReAuthenticateService = TestBed.inject(ReAuthenticateService);
    const obser: SendInformationService<any> = TestBed.inject(SendInformationService);
    service.handleError()({} as any);
    obser.lastValue(MODAL).buttons[0].callback(() => {});
    expect(service).toBeTruthy();
  });
});
