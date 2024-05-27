//
// Copyright (C) 2024 - Smart Jungle
//

import { CriptoService } from './cripto.service';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: CriptoService', () => {
  // eslint-disable-next-line prefer-const
  let http: HttpClient;
  const criptoService = new CriptoService(http);

  beforeEach(() => {
    criptoService.setPublickeyMbaas(
      // eslint-disable-next-line max-len
      {
        kty: 'RSA',
        kid: '1553133006',
        use: 'enc',
        alg: 'RSA-OAEP-256',
        key_ops: ['encrypt', 'wrap', 'verify'],
        e: 'AQAB',
        n:
          // eslint-disable-next-line max-len
          'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDeH6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxRtDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
      }
    );
  });

  it('Should: create keys, encrypt and unencrypt data', () => {
    criptoService.keyCreator().then(resp => {
      // we use the same both front keys
      const x = criptoService.getPublickeyFrontend();
      criptoService.createEncryptor(x);

      const data = {
        name: 'juan',
        id: '12345678'
      };
      const payload = JSON.stringify(data);

      criptoService.encrypter(payload).then(resp2 => {
        criptoService.unencrypter(resp2).then(resp3 => {
          expect(resp3).toContain('juan');
          expect(resp3).toContain('12345678');
        });
      });
    });
  });
});

describe('Cripto.Service TestBed', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [CriptoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
  );

  it('unencrypter 1', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      of({
        keys: [
          {
            kty: 'RSA',
            kid: '1553133006',
            use: 'enc',
            alg: 'RSA-OAEP-256',
            key_ops: ['encrypt', 'wrap', 'verify'],
            e: 'AQAB',
            n:
              'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDe' +
              'H6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxR' +
              'tDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5' +
              'xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
          },
          {
            use: 'enc'
          }
        ]
      })
    );
    service.getKeysRemote().then(response => {
      expect(service).toBeTruthy();
    });
  });

  it('unencrypter sin keys.use', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      of({
        keys: [
          {
            kty: 'RSA',
            kid: '1553133006',
            // use: 'enc',
            alg: 'RSA-OAEP-256',
            key_ops: ['encrypt', 'wrap', 'verify'],
            e: 'AQAB',
            n:
              'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDe' +
              'H6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxR' +
              'tDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5' +
              'xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
          },
          {
            // use: 'enc'
          }
        ]
      })
    );
    service.getKeysRemote().then(response => {
      expect(service).toBeTruthy();
    });
  });

  it('unencrypter try catch', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      of({
        keys: [
          {
            kty: 'RSA',
            kid: '1553133006',
            use: 'enc',
            alg: 'RSA-OAEP-256',
            key_ops: ['encrypt', 'wrap', 'verify'],
            e: 'AQAB',
            n:
              'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDe' +
              'H6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxR' +
              'tDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5' +
              'xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
          },
          {
            use: 'enc'
          }
        ]
      })
    );
    spyOn(TestBed.inject(CriptoService), 'setPublickeyMbaas').and.callFake(() => {
      throw new TypeError('Test de try catch');
    });
    service.getKeysRemote().then(response => {
      expect(service).toBeTruthy();
    });
  });

  it('unencrypter 3', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of(false));
    service.getKeysRemote().then(response => {
      expect(service).toBeTruthy();
    });
  });

  it('unencrypter 2', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(service, 'getJoseJWECreateDecrypt').and.callFake(() => {
      throw new Error('TEST');
    });

    service.unencrypter(
      `eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vbWJhYXMuZGVzYS5jby5kYXZpdmllbmRhLmNvbS9hdXRoL3YxL2tleXN0b3JlLy53ZWxsLWtub3duL2p3a3MuanNvbiIsImtpZCI6IjExMzEwMTQ5MTEifQ.
      eyJhdWQiOiJEQVY6Q0xPVUQ6QVVUSCIsImV4cCI6MTYyMTYzOTMzNiwiaWF0IjoxNjIxNjM3NTM2LCJpc3MiOiJEQVY6Q0xPVUQ6QVVUSCIsInN1YiI6IjMwZDFmNmYwLWJhODctMTFlYi04MDcwLWQ3OTc2OGMw
      ZDE3YiIsInVzZSI6Im8iLCJkb2N1bWVudE51bWJlciI6IjU2Nzc2NTc4IiwiZG9jdW1lbnRUeXBlIjoiMDEiLCJwcm9kdWN0IjoiQ1RBVFJBX0NPXzU2Nzc2NTc4XzAxIiwianRpIjoiMzBmMDJkNTAtYmE4Ny0x
      MWViLWFiYzMtMTUyODlkZGM4NGNiIn0.TdnlQ5uNCUUN0wRUzmD2WLrWUO6SMldPoI-y3nXbhPBnH2iJW5nOq5Fzyx4dFaKuSvlSN3HZkip0NZ63JsWDrJtj4rvBN1RJWk-IZmu1crsiEzvf7x1oM3hjfzLFgoNF
      4sAkL5LZK9xb7_Ta-C6wwp6CnUz7HTufh2z0QrMvUs6tasDjjUvtld9mneWhws7_u3rlIG8tp6ZNsIbEk_wCnSQ_x3EOAeVhId-e2nt-MYawRlHQ7jR8cIn8B2GTIAVcu8FMILCXY7Y4hIAiYkq3W0GXa-CkUbRa
      4c9NqTmoKfjdNUUFPSL8o7V6FL_jc0jPpG59OHvoBWZ-NAk1Yp_uAQ`
    );
    expect(service).toBeTruthy();
  });

  it('keyCreator 2', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(service, 'getJoseJWECreateKeyStore').and.callFake(() => {
      throw new Error('TEST');
    });
    service.keyCreator();
    expect(service).toBeTruthy();
  });
});

describe('Cripto.Service TestBed', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [CriptoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
  );

  it('unencrypter', () => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(service, 'unencrypter').and.callFake((token: any) => new Promise(null));
    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      new BehaviorSubject<any>({
        keys: {
          a: {
            kty: 'RSA',
            kid: '1553133006',
            use: 'enc',
            alg: 'RSA-OAEP-256',
            key_ops: ['encrypt', 'wrap', 'verify'],
            e: 'AQAB',
            n:
              'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDe' +
              'H6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxR' +
              'tDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5' +
              'xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
          },
          b: {
            use: 'enc'
          }
        }
      }).asObservable()
    );
    service.getKeysRemote();
    expect(service).toBeTruthy();
  });

  it('getKeysRemote', waitForAsync(() => {
    const service: CriptoService = TestBed.inject(CriptoService);
    spyOn(service.http, 'get').and.returnValue(
      new BehaviorSubject<any>({
        keys: [
          {
            kty: 'RSA',
            kid: '1553133006',
            use: 'enc',
            alg: 'RSA-OAEP-256',
            key_ops: ['encrypt', 'wrap', 'verify'],
            e: 'AQAB',
            n:
              'lEkhmX7QqUGzA0efqo6tmdhLN0RwvNGIjZmDOE4DXuZjFGNWHrTlbNhqUXebwuRRHJBxM3JB-C0s2Fd6qvI9oduYs1dQBBUtiDe' +
              'H6TUvYmdTlLDBytCGDUN4Aup5G6S3CEeSOmboi48CroVmMqAE1FXLQEF35bgFSdyt_87B5bqIfLTvcna8FQ2OT7O_wlQcmt4OtOAVxR' +
              'tDm1cr92A8VfhXZ_fgb7aKQBhmULt22_dHcjc2bylCj0cjfBeKAf_UDgDHNK324B_kipurcMvY53sMWzKemweIsb1UnRKAKX68b6QXa5' +
              'xu-VjuS3obo7to4DIBIBpXAtdHQJeYSKXBqw'
          },
          {
            use: 'enc'
          }
        ]
      }).asObservable()
    );
    service.getKeysRemote().then(response => {
      setTimeout(() => expect(service).toBeTruthy(), 2500);
    });
  }));
});
