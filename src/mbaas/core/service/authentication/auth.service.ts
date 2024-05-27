//
// Copyright (C) 2024 - Smart Jungle
//

// **** IMPORT'S ****
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/mbaas/mbaas.const';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // **** PROPERTIES ****
  private accessToken: any;
  private refreshToken: any;
  private clientId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private decoder: JwtHelperService
  ) {}

  // **** SETTERS AND GETTERS -START ****
  setClientId(clientId: any): void {
    this.clientId = clientId;
  }

  setAccessToken(accessToken: any, saveLocalStorage: boolean): void {
    this.accessToken = accessToken;
    if (saveLocalStorage) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
  }

  getClientId(): any {
    return this.clientId;
  }

  getAccessToken(): any {
    return localStorage.getItem(ACCESS_TOKEN)
      ? localStorage.getItem(ACCESS_TOKEN)
      : this.accessToken;
    // return localStorage.getItem('access-token');
  }

  setRefreshToken(refreshToken: any, saveLocalStorage: boolean): void {
    this.refreshToken = refreshToken;
    if (saveLocalStorage) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
  }

  getRefreshToken(): any {
    return localStorage.getItem(REFRESH_TOKEN)
      ? localStorage.getItem(REFRESH_TOKEN)
      : this.refreshToken;
    // return localStorage.getItem('refresh-token');
  }
  // **** SETTERS AND GETTERS - END ****

  // ******************************************************
  // save access and refresh
  // input: NA
  // return: NA
  // ******************************************************
  saveTokenData(resauth: any, clientId: any, saveLocalStorage: boolean) {
    console.log('saveclient', clientId);
    this.setClientId(clientId);
    this.setAccessToken(resauth.access_token, saveLocalStorage);
    this.setRefreshToken(resauth.refresh_token, saveLocalStorage);
  }

  // ******************************************************
  // set access and refresh token to undefined
  // input: NA
  // return: NA
  // ******************************************************
  deleteAllTokenData() {
    this.setAccessToken(undefined, false);
    this.setRefreshToken(undefined, false);
  }

  // ******************************************************
  // return a token, or new if it expired
  // input: NA
  // return: token
  // ******************************************************
  public getToken(): any {
    return this.getAccessToken();
  }

  // ******************************************************
  // POST to back with otp for a token
  // input: NA
  // return: Observable
  // ******************************************************
  authenticate(otp: string): Observable<any> {
    const bodyReq = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: otp,
    };
    // const strObj = JSON.stringify(bodyReq);
    return this.http
      .post<any>(environment.auth, bodyReq, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.catchErrorCallback()));
  }

  catchErrorCallback(): (err: any) => any {
    return (err) => {
      this.router.navigate(['forbidden']);
      throw new Error('error in auth.service.authenticate: ' + err);
    };
  }

  // ******************************************************
  // POST to back with refresh token
  // input: NA
  // return: Observable
  // ******************************************************
  reauthenticate(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const bodyReq = {
      grant_type: REFRESH_TOKEN,
      refresh_token: refreshToken,
    };
    return this.http
      .post<any>(environment.auth, bodyReq, {
        headers: this.headerTokenInjector(),
      })
      .pipe(catchError(this.catchErrorCallback()));
  }

  // ******************************************************
  // check if exist token
  // input: N/A
  // return: boolean
  // ******************************************************
  public get existToken(): boolean {
    return this.getAccessToken() !== undefined;
  }

  // ******************************************************
  // decode token for inside info
  // input: token
  // return: token decoded
  // ******************************************************
  public decodeToken(token: any) {
    return this.decoder.decodeToken(token);
  }

  // ******************************************************
  // inject header with or without token
  // input: boolean [TRUE=with token | FALSE=without token]
  // return: HttpHeaders
  // *****************************************************

  public headerTokenInjector(type: string = 'application/json'): HttpHeaders {
    if (this.existToken) {
      const token = this.getToken();
      if (token) {
        const httpOptions = new HttpHeaders({
          'Content-Type': type,
          Authorization: `Bearer ${token}`,
          timeout: `${120000}`,
        });
        return httpOptions;
      }
    }
    const httpOptionsEmpty = new HttpHeaders({
      'Content-Type': type,
    });
    return httpOptionsEmpty;
  }

  // ******************************************************
  // inject header with or without token
  // input: boolean [TRUE=with token | FALSE=without token]
  // return: HttpHeaders
  // *****************************************************

  public headerTokenInjectorMultipart(): HttpHeaders {
    if (this.existToken) {
      const token = this.getToken();
      if (token) {
        const httpOptions = new HttpHeaders({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          timeout: `${120000}`,
        });
        return httpOptions;
      }
    }
    const httpOptionsEmpty = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return httpOptionsEmpty;
  }

  // función en uso
  reAuthRequest(req: HttpRequest<any>): HttpRequest<any> {
    const refreshToken = this.getRefreshToken();
    const bodyReq = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };
    return req.clone({
      method: 'POST',
      url: environment.resfresher,
      body: bodyReq,
      headers: this.headerTokenInjector(),
      reportProgress: false,
      params: null,
      responseType: 'json',
      withCredentials: false,
    });
  }

  // ******************************************************
  // POST to back with otp for a token
  // input: NA
  // return: Observable
  // ******************************************************
  authorization(otp?: string): Observable<any> {
    const accessToken = this.getAccessToken();
    if (!otp) { console.error('FAIL OTP'); }
  //  console.warn(accessToken);
    const bodyReq = {
      grant_type: 'access_token',
      access_token: otp ? otp : accessToken,
    };
    // const strObj = JSON.stringify(bodyReq);
    return this.http
      .post<any>(environment.auth, bodyReq, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.catchErrorCallback()));
  }

}
