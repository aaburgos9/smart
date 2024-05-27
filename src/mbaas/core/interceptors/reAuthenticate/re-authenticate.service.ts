import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, take, concatMap, retry, skipWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authentication/auth.service';
import { STATE_ERROR, MODAL } from '../../../mbaas.const';
import { environment } from 'src/environments/environment';
import { SendInformationService } from '../../service/SendInformation/send-information.service';
import { PostMessagesService } from '../../service/postMessages/post-messages.service';
import { AlertModalTMAComponent } from '../../components/modal/alert-modal-tma/alert-modal-tma.component';
import { KINDS } from 'src/mbaas/mbaas.kind.const';


@Injectable({
  providedIn: 'root'
})
export class ReAuthenticateService implements HttpInterceptor {

  workflowUrl: string;
  soporteUploadImage: string;
  soporteWebAppLHC: string;
  reautentiate: boolean;

  constructor(
    private auth: AuthService,
    private modal: SendInformationService<any>,
    private postMessage: PostMessagesService,
    private router: Router
  ) {
    this.workflowUrl = environment.workflow;
    this.soporteUploadImage = environment.soporteUploadImage;
    this.reautentiate = environment.interceptors.reutenticate;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( this.reautentiate && req.url === this.workflowUrl ) {
      const requestClone = req.clone();
      const replaceRequest = this.auth.reAuthRequest(req);
      return next.handle(replaceRequest).pipe(
        retry(5),
        catchError( this.handleError() ),
        skipWhile( this.skipWhile() ),
        map( this.map() ),
        concatMap(this.responseConcatMap(requestClone, next))
      );
    }
    return next.handle(req);
  }

  skipWhile(): (value: HttpResponse<any>) => any {
    return (value: HttpResponse<any>) => !!!value.body;
  }

  map(): (data: HttpResponse<any>) =>  any {
    return (data: HttpResponse<any>) => data.body;
  }


  responseConcatMap(req: HttpRequest<any>, next: HttpHandler): (result: any) => Observable<HttpEvent<any>> {
   return (response: any) => {
      if (response.state === STATE_ERROR) {
        this.router.navigate(['/forbidden']).finally( () => console.log('Forbidden pot Interceptor'));
        return next.handle(req).pipe(take(1));
      }
      this.auth.setAccessToken(response.access_token, true);
      return next.handle(req.clone({
        setHeaders: {
          Authorization: `Bearer ${ this.auth.getAccessToken() }`
        }
      }));
    };
  }

  handleError(): any {
    return (error: HttpErrorResponse) => {
      this.modal.sendData({
        display: true,
        buttons: [
          {
            callback: (close) => {
              this.postMessage.getAndSendPostMessages(KINDS.POST_APPFINISH, { status: 'ok', statusCode: 200, statusMessage: 'App Finish' });
              this.router.navigate(['forbidden']);
              close();
            },
            buttonText: 'Aceptar',
            class: 'alertModal__footer--button alertModal__footer--button--primary'
          }
        ],
        title: '',
        message: 'El tiempo máximo permitido para realizar transacciones terminó por su seguridad se ha cerrado la sesión',
        entryComponent: AlertModalTMAComponent
      }, MODAL);
      return error;
    };
  }
}
