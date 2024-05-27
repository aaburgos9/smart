import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { STATE_ERROR, MBAAS_STEPS, MODAL, ACTIONAPPFINISH, TRANSLATE, THEMES, CANAL, DEFAULT_THEME, REFERED, KIND, MODULO_PRODUCT } from 'src/mbaas/mbaas.const';
import { KINDS } from 'src/mbaas/mbaas.kind.const';
import { AuthService } from '../authentication/auth.service';
import { CriptoService } from '../encryption/cripto.service';
import { PostMessagesService } from '../postMessages/post-messages.service';
import { SendInformationService } from '../SendInformation/send-information.service';
import { ThemeServiceService } from '../themeService/theme-service.service';
import { WorkflowService } from '../workflow/workflow.service';

@Injectable({
  providedIn: 'root'
})
export class BootResolverServiceService implements Resolve<any> {

  constructor(
    private router: Router,
    private auth: AuthService,
    private cripto: CriptoService,
    private workflow: WorkflowService,
    private guard: SendInformationService<any>,
    private translate: TranslateService,
    private actionStep: SendInformationService<(item: any) => void>,
    private postMessage: PostMessagesService,
    private themeService: ThemeServiceService
  ) {
    this.translate.setDefaultLang(TRANSLATE.LENGUAJE);
  }

  private appReadyPost: boolean;

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if(route.params.otp){
      this.appReadyPost = true;
      this.auth.authenticate(route.params.otp).subscribe(this.successAuthenticate(), this.errorAuthenticate());
    } else {
      this.auth.authorization().subscribe(this.successAuthenticate(), this.errorAuthenticate());
      this.appReadyPost = false;
    }
    this.actionStep.sendData(this.callAction(), ACTIONAPPFINISH);
    return {};
  }

  successAuthenticate(): (response: any) => void {
    return resauth => {
      if (resauth.state === STATE_ERROR) {
        this.router.navigate(['/forbidden']);
        return;
      }
      const payload: any = {};
      const tokenDecoded = this.auth.decodeToken(resauth.access_token);
      this.cripto.getKeysRemote()
        .then(this.successGetKeyRemote(tokenDecoded, resauth, payload))
        .catch(this.errorAuthenticate());
    };
  }

  errorAuthenticate(): (err: any) => void {
    return err => {
      console.error('Authentication: ', err);
      this.router?.navigate(['/forbidden']);
    };
  }

  successGetKeyRemote(tokenDecoded: any, resauth: any, payload: any): (mbaasKey: any) => void {
    return mbassKey => {
      this.cripto.keyCreator()
        .then(this.successKeyCreator(tokenDecoded, resauth, payload))
        .catch(this.errorAuthenticate());
    };
  }

  // AgregarCambios
  successKeyCreator(tokenDecoded: any, resauth: any, payload: any): (mbaasKey: any) => void {
    return (respFront: any) => {
      const productId = tokenDecoded.product;
      //    console.warn(productId);
      this.auth.saveTokenData(resauth, tokenDecoded.sub, this.saveLocalStorage(productId));
      // El último valor que está incluido en el productId es el canal
      this.guard.sendData(productId.split('_').pop(), CANAL);
      this.guard.sendData('CDT', MODULO_PRODUCT);
      // this.guard.sendData(productId.split('_').shift(), MODULO_PRODUCT); toDo validar desde producto
      this.guard.sendData(this.auth.getClientId(), 'ClientId');
      payload.llaveEncriptacion = JSON.stringify(respFront);
      this.callTheme(THEMES[this.guard.lastValue(CANAL)]);
      // se elimina de la cache el refered para transversales
      localStorage.removeItem(REFERED);
      this.workflow.workflow(MBAAS_STEPS.APPBOOT, payload);
      this.postMessage.getAndSendPostMessages(KINDS.POST_APPREADY, {});
    };
  }

  saveLocalStorage(productId: string): boolean {
    const save = {
      Product_template: true
    }[productId];
    return save === undefined ? true : save;
  }

  callAction(): (close: any) => void {
    return (close) => {
      const data = this.guard.lastValue(MODAL);
      this.postMessage.callPostMessage(data.postmessage);
      console.log('End mbaas for APP');
    };
  }

  /**
   * Función que enmascara el numero de cuenta en el popUp.
   * @param data Objeto almacenado en el Observable MODAL
   */
  updateMessage(data: any) {
    console.log('reemplazo de valores -----> ', data);
    const saerchedVar = data.message.match(/\[(.*?)\]/);
    if (saerchedVar) {
      data.message = data.message.replace(/\[(.*?)\]/g, '****' + data.payload[saerchedVar[1]]+''.slice(-4));
    }
  }

  /**
  * Funcion que permite agregar el thema que corresponda segun el canal
  */
  callTheme(channel: string): boolean {
    if (channel) {
      this.themeService.addTheme(channel);
      this.themeService.removeTheme();
      return true;
    }
    this.themeService.addTheme(DEFAULT_THEME);
    return false;

  }

}
