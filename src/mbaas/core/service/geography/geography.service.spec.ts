import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { CriptoService } from '../encryption/cripto.service';
import { SendInformationService } from '../SendInformation/send-information.service';

import { GeographyService } from './geography.service';
import { CatalogoService } from '../catalogo/catalogo.service';
import { of } from 'rxjs';

describe('GeographyService', () => {

  const test = {
    "data": {
      "pais": [
        {
          "codigo": "999",
          "nombre": "OTRO",
          "departamento": []
        },
        {
          "codigo": "200",
          "nombre": "OTRO",
          "departamento": []
        },
        {
          "codigo": "169",
          "nombre": "COLOMBIA",
          "departamento": [
            {
              "codigo": "16925",
              "nombre": "CUNDINAMARCA",
              "ciudad": [
                {
                  "categoria": "4",
                  "codigo": "16925001",
                  "nombre": "AGUA DE DIOS",
                  "nombreCategoria": "Rurales",
                  "municipio": [
                    {
                      "codigo": "16925001000",
                      "nombre": "AGUA DE DIOS"
                    },
                    {
                      "codigo": "16925001002",
                      "nombre": "LETICIA"
                    },
                    {
                      "codigo": "16925001003",
                      "nombre": "LA PUNA"
                    }
                  ]
                },
                {
                  "categoria": "4",
                  "codigo": "16925019",
                  "nombre": "ALBAN-CUNDINAMARCA",
                  "nombreCategoria": "Rurales",
                  "municipio": [
                    {
                      "codigo": "16925019000",
                      "nombre": "ALBAN"
                    },
                    {
                      "codigo": "16925019001",
                      "nombre": "CHIMBE(DANUBIO)"
                    },
                    {
                      "codigo": "16925019002",
                      "nombre": "PANTANILLO"
                    },
                    {
                      "codigo": "16925019003",
                      "nombre": "LA MARIA"
                    }
                  ]
                },
                {
                  "categoria": "4",
                  "codigo": "16925035",
                  "nombre": "ANAPOIMA",
                  "nombreCategoria": "Rurales",
                  "municipio": [
                    {
                      "codigo": "16925035000",
                      "nombre": "ANAPOIMA"
                    },
                    {
                      "codigo": "16925035001",
                      "nombre": "LA PAZ"
                    },
                    {
                      "codigo": "16925035002",
                      "nombre": "SAN ANTONIO"
                    },
                    {
                      "codigo": "16925035003",
                      "nombre": "PATIO BONITO"
                    }
                  ]
                },
                {
                  "categoria": "4",
                  "codigo": "16925040",
                  "nombre": "ANOLAIMA",
                  "nombreCategoria": "Rurales",
                  "municipio": [
                    {
                      "codigo": "16925040000",
                      "nombre": "ANOLAIMA"
                    },
                    {
                      "codigo": "16925040002",
                      "nombre": "LA FLORIDA"
                    },
                    {
                      "codigo": "16925040003",
                      "nombre": "REVENTONES"
                    },
                    {
                      "codigo": "16925040004",
                      "nombre": "CANAZEJAS"
                    },
                    {
                      "codigo": "16925040005",
                      "nombre": "BOQUERON DE ILO"
                    },
                    {
                      "codigo": "16925040006",
                      "nombre": "CORRALEJAS"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
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
        SendInformationService,
        CriptoService,
        CatalogoService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
  );
  let service: GeographyService;

  beforeEach(() => {
    spyOn(TestBed.inject(CatalogoService), 'assetsText').and.returnValue(of(JSON.stringify(test.data)));
    service = new GeographyService(TestBed.inject(CatalogoService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test for getCountries with code', () => {
    const response = service.getCountries(['169']);
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getCountries without code', () => {
    const response = service.getCountries();
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getDepartaments', () => {
    const response = service.getDepartments('169');
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getCities', () => {
    const response = service.getCities('169', '16925');
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getCitiesByCountry', () => {
    const response = service.getCitiesByCountry('169');
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getCitiesByCountry empty', () => {
    const response = service.getCitiesByCountry('500');
    expect(response.length).toBe(0);
  });

  it('test for getMunicipalities ', () => {
    const response = service.getMunicipalities('169', '16925', '16925001');
    expect(response.length).toBeGreaterThan(0);
  });

  it('test for getCountryName ', () => {
    const response = service.getCountryName('169');
    expect(response).toBe('COLOMBIA');
  });

  it('test for getCountryName with key', () => {
    const response = service.getCountryName('169', 'nombre');
    expect(response).toBe('COLOMBIA');
  });

  it('test for getDepartamentName ', () => {
    const response = service.getDepartamentName('169', '16925');
    expect(response).toBe('CUNDINAMARCA');
  });

  it('test for getDepartamentName with key', () => {
    const response = service.getDepartamentName('169', '16925', 'nombre');
    expect(response).toBe('CUNDINAMARCA');
  });

  it('test for getCityName', () => {
    const response = service.getCityName('169', '16925', '16925001');
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getCityName with key', () => {
    const response = service.getCityName('169', '16925', '16925001', 'nombre');
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getCityNameByCountry', () => {
    const response = service.getCityNameByCountry('169', '16925001');
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getCityNameByCountry with key', () => {
    const response = service.getCityNameByCountry('169', '16925001', 'nombre');
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getMunicipalityName', () => {
    const response = service.getMunicipalityName('169', '16925', '16925001', '16925001000' );
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getMunicipalityName with key', () => {
    const response = service.getMunicipalityName('169', '16925', '16925001', '16925001000', 'nombre' );
    expect(response).toBe('AGUA DE DIOS');
  });

  it('test for getCityById', () => {
    const response = service.getCityById('16925001');
    expect(response.dane).toBe('16925001');
  });

  it('test for getDepartamentById', () => {
    const response = service.getDepartamentById('16925');
    expect(response.dane).toBe('16925');
  });

  it('test for getMunicipalityByCity', () => {
    const response = service.getMunicipalityByCity('16925001');
    expect(response.dane).toBe('16925001000');
  });

  it('test for getMunicipalityByCity code dane empty', () => {
    const response = service.getMunicipalityByCity('');
    expect(response.dane).toBe('');
  });

  it('test for getCountryById', () => {
    const response = service.getCountryById('169');
    expect(response.dane).toBe('169');
  });

  it('test for getCountryCodeByName', () => {
    const response = service.getCountryCodeByName('COLOMBIA');
    expect(response).toBe('169');
  });

  it('test for getCountryCodeByName fail', () => {
    const response = service.getCountryCodeByName('TEST');
    expect(response).toEqual('');
  });

  it('test for getDepartamentCodeByName ', () => {
    const response = service.getDepartamentCodeByName('CUNDINAMARCA', '169');
    expect(response).toBe('16925');
  });

  it('test for getDepartamentCodeByName fail', () => {
    const response = service.getDepartamentCodeByName('TEST', '169');
    expect(response).toEqual('');
  });

  it('test for getCityCodeByName ', () => {
    const response = service.getCityCodeByName('AGUA DE DIOS', '169');
    expect(response).toBe('16925001');
  });

  it('test for getCityCodeByName fail', () => {
    const response = service.getCityCodeByName('TEST', '169');
    expect(response).toEqual('');
  });

});
