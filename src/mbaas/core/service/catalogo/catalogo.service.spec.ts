import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CatalogoService } from './catalogo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CatalogoService', () => {
  let sanitizer: DomSanitizer;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('token');
          },
          allowedDomains: ['.*']
        }
      })],
    providers: [CatalogoService, {
      provide: DomSanitizer,
      useValue: {
        sanitize: () => 'safeString',
        bypassSecurityTrustUrl: () => 'safeString'
      }
    }, AuthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
  }));

  beforeEach(() => {
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should be created', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    expect(service).toBeTruthy();
  });

  it('blob 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: {
        size: 370,
        type: 'image/svg+xml'
      }})
    );
    spyOn(window.URL, 'createObjectURL').and.callFake( () => '');
    service.assetsBlob('blob.png').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('blob 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.assetsBlob('blob.png', {}).subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('json 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.assetsJson('algo.json').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('json 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.assetsJson('algo.json', {}).subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('data 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.data('algo.json').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('data 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.data('algo.json', {}).subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('data 3', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.data('algo.json', {}, 'a').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('params 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.params('algo.json', {}).subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('params 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.params('algo.json').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('text 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: { mensaje: ''}})
    );
    service.assetsText('ago.text').subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('json 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(
      of({ body: ''})
    );
    service.assetsText('algo.txt', {}).subscribe(
      response => {
        expect(service).toBeTruthy();
      }
    );
  });

  it('handleError 1', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    const a: any = { };
    service.handleError(  a );
    expect(service).toBeTruthy();
  });

  it('handleError 2', () => {
    const service: CatalogoService = TestBed.inject(CatalogoService);
    const a: any = { error: new ErrorEvent('mi error') };
    service.handleError(  a );
    expect(service).toBeTruthy();
  });
});
