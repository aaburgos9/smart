import { TestBed, waitForAsync } from '@angular/core/testing';
import { FileService } from './file.service';
import { of } from 'rxjs';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('Test updload File', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
            allowedDomains: ['.*']
          }
        })],
      providers: [FileService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
    .compileComponents();
  }));

  it('should be created ', () => {
    const service: FileService = TestBed.inject(FileService);
    expect(service).toBeTruthy();
  });

  it('should', () => {
    const service: FileService = TestBed.inject(FileService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(of({ body: '' }));
    let reference;
    service.uploadImages({}).subscribe(result => {
      reference = result;
      expect(reference.data).toBeUndefined();
    });
  });

  it('should be upload image', () => {
    const service: FileService = TestBed.inject(FileService);
    spyOn(TestBed.inject(HttpClient), 'request').and.returnValue(of({ body: '' }));
    let reference;
    service.uploadImages({ test: 'base64' }).subscribe(result => {
      reference = result;
      expect(reference.body).toBeDefined();
    });
  });
});
