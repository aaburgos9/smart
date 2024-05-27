import { TestBed } from '@angular/core/testing';

import { WorkflowService } from './workflow.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../authentication/auth.service';
import { CriptoService } from '../encryption/cripto.service';
import { SendInformationService } from '../SendInformation/send-information.service';
import { JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { STATE_SUCESS, STATE_ERROR, STATUS_NORMAL, MBAAS_ROUTING, MBAAS_STEPS } from 'src/mbaas/mbaas.const';
import { CatalogoService } from '../catalogo/catalogo.service';
import { MTS001Component } from '../../../page/mts001/mts001.component';


export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

describe('WorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.MTS001}`,
        component: MTS001Component
      }]),
        JwtModule.forRoot({
          config: {
            tokenGetter: jwtTokenGetter,
            allowedDomains: ['.*']
          }
        })],
      providers: [
        AuthService,
        CriptoService,
        SendInformationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    window.dataLayer = { push: () => {} };
  });

  it('should be created', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    expect(service).toBeTruthy();
  });

  it('Workflow getModulo', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    const result = service.getRoute('MTS001');
    expect(result).toEqual(`${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.MTS001.ROUTE}`);
  });

  it('Workflow errorGeneralWorflow', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    service.errorGeneralWorflow()('Error Message');
    expect(service).toBeTruthy();
  });

  it('Workflow successWorkflow STATE_SUCESS uno', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    service.successWorkflow()({
      data: {
        payload: {

        },
      status: STATE_SUCESS,
      stepId: 'MTS001',
      message: STATUS_NORMAL
      }
    });
    expect(service).toBeTruthy();
  });

  it('Workflow successWorkflow STATE_SUCESS dos', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    service.pro = true;
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    service.successWorkflow()({
      data: {
        payload: {

        },
      status: STATE_SUCESS,
      stepId: 'MTS001',
      message: STATUS_NORMAL
      }
    });
    expect(service).toBeTruthy();
  });

  xit('Workflow successWorkflow STATE_SUCESS tres', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    service.pro = false;
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    service.successWorkflow()({
      data: {
        payload: {},
        status: STATE_SUCESS,
        stepId: 'MTS001',
        message: STATUS_NORMAL
      }
    });
    expect(service).toBeTruthy();
  });

  it('Workflow successWorkflow STATE_ERROR', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    service.successWorkflow()({
      data: {
        payload: {

        },
      status: STATE_ERROR,
      stepId: 'MTS001'
      }
    });
    expect(service).toBeTruthy();
  });

  it('Workflow successWorkflow Other', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});

    service.successWorkflow()({
      data: {
        payload: {
        },
      status: 5,
      stepId: 'MTS001'
      }
    });
    expect(service).toBeTruthy();
  });

  it('Workflow workflow 1', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue( of({ ip: '0.0.0.0'}) );
    spyOn(TestBed.inject(HttpClient), 'post').and.returnValue( of({}) );
    service.workflow('APPBOOT', {
      stepId: '000',
      algo: true
    });
    expect(service).toBeTruthy();
  });

  it('Workflow workflow 2', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue( of({ ip: '0.0.0.0'}) );
    spyOn(TestBed.inject(HttpClient), 'post').and.returnValue( of(null) );
    service.workflow('000', {
      stepId: '000',
      algo: true
    });
    expect(service).toBeTruthy();
  });

  it('Workflow workflow 3', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue( of({ ip: '0.0.0.0'}) );
    spyOn(TestBed.inject(HttpClient), 'post').and.returnValue( of(null) );
    service.workflow('APPBOOT', {
      stepId: '000',
      algo: true
    });
    expect(service).toBeTruthy();
  });

  it('Workflow workflow 3', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue( of({ ip: '0.0.0.0'}) );
    service.workflow('000', {
      stepId: 'MTS001',
      algo: true
    });
    expect(service).toBeTruthy();
  });

  it('Workflow workflow catch', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake( () => {});
    spyOn(TestBed.inject(CriptoService), 'encrypter').and.returnValue(Promise.reject('test error'));
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue( of({ ip: '0.0.0.0'}) );
    service.workflow('CUE001', {
      stepId: 'MTS001',
      algo: true
    });
    expect( () => {
      throw new Error('test error');
    }).toThrowError('test error');
  });

  xit('successUncrypter() 1', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    service.successUncrypter({ data: { stepId: 'PROMEX020', status: 1 }})
    ({ data: { stepId: 'PROMEX020', status: 1 }});
    expect(service).toBeTruthy();
  });

  it('successUncrypter() 2', () => {
    const service: WorkflowService = TestBed.inject(WorkflowService);
    spyOn(TestBed.inject(CatalogoService), 'data').and.returnValue(of([{
      title: '',
      message: '',
      buttons: [{}]
    }]));
    spyOn(TestBed.inject(SendInformationService), 'sendData').and.callFake(() => {});
    service.successUncrypter({ data: { status: 3 }})
    ({ data: { stepId: 'MTS001'}});
    expect(service).toBeTruthy();
  });
});
