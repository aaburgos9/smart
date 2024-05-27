import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, skipWhile } from 'rxjs/operators';
import { HttpClient, HttpRequest, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ParamsAssets, ParamsData, Params } from './params';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  private TEXT = {
    type: 'text/plain; charset=utf-8',
    responseType: 'text'
  };

  private JSON = {
    type: 'application/json; charset=utf-8',
    responseType: 'json'
  };

  private BLOB = {
    type: 'application/x-www-form-urlencoded',
    responseType: 'blob'
  };

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  private get(endPoint: string, name: string, params: any, options: { type: string; responseType: string; }): Observable<any>  {
    return this.httpClient.request(new HttpRequest('GET', `${endPoint}/${name}`,
      {
        observe: 'response',
        reportProgress: false,
        responseType: options.responseType,
        headers: this.auth.headerTokenInjector(options.type),
        params: new HttpParams({ fromObject: params })
      }))
      .pipe(
        retry(3),
        catchError( this.handleError ),
        skipWhile( (value: HttpResponse<any>) => !!!value.body ),
        map( (data: HttpResponse<any>) => data.body )
      );
  }

  assetsJson(name: string, params: ParamsAssets = {}): Observable<any> {
    return this.get(environment.assets, name, params, this.JSON);
  }

  assetsText(name: string, params: ParamsAssets = {}): Observable<any> {
    return this.get(environment.assets, name, params, this.TEXT);
  }

  assetsBlob(name: string, params: ParamsAssets = {}): Observable<any> {
    return this.get(environment.assets, name, params, this.BLOB)
      .pipe( map(res => this.toSrc(res)));
  }

  data(name: string, params: ParamsData = {}, filter?: string): Observable<any> {
    if (name) {
      if ( filter ) {
        name = `${name}/${filter}`;
      }
      return this.get(environment.data, name, params, this.JSON);
    }
  }

  params(name: string, params: Params = {}): Observable<any> {
    return this.get(environment.params, name, params, this.JSON);
  }



  private toSrc(blobContent: Blob): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl( window.URL.createObjectURL(blobContent));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Assets Service, an error occurred:', error.error.message);
    } else {
      console.error(`Assets Service returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Assets Service: Something bad happened; please try again later.');
  }
}
