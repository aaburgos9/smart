import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/mbaas/core/service/authentication/auth.service';
// import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
// import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
// import { STATE_ERROR, GUARD_PRODUCTO, MBAAS_STEPS, TRANSLATE, MODAL, ACTIONAPPFINISH } from 'src/mbaas/mbaas.const';
// import { WorkflowService } from 'src/mbaas/core/service/workflow/workflow.service';
// import { TranslateService } from '@ngx-translate/core';
// import { PostMessagesService } from 'src/mbaas/core/service/postMessages/post-messages.service';
// import { Subscription } from 'rxjs';
// import { ThemeServiceService } from 'src/mbaas/core/service/themeService/theme-service.service';

      // {
      //   "iss": "Online JWT Builder",
      //   "iat": 1565906011,
      //   "exp": 1597442011,
      //   "aud": "www.example.com",
      //   "sub": "jrocket@example.com",
      //   "cliendtID": "0123456789",
      //   "partner": "ML",
      //   "product": "CAM",
      //   "lenguaje": "es-CR",
      //   "canal": "web",
      //   "pais": "CR",
      //   "modulo": "que???"
      // }

@Component({
  selector: 'mbaas-mbaas-boot',
  templateUrl: './mbaas-boot.component.html',
  styleUrls: ['./mbaas-boot.component.scss']
})
export class MbaasBootComponent implements OnInit {

  // private modalSubscription: Subscription;
  // public otp: string;

  // constructor(
  //   private router: Router,
  //   private route: ActivatedRoute,
  //   private auth: AuthService,
  //   private cripto: CriptoService,
  //   private workflow: WorkflowService,
  //   private guard: SendInformationService<any>,
  //   private translate: TranslateService,
  //   private actionStep: SendInformationService<(item: any) => void>,
  //   private obser: SendInformationService<string>,
  //   private postMessage: PostMessagesService,
  //   private themeService: ThemeServiceService
  // ) {
  //   this.translate.setDefaultLang(TRANSLATE.LENGUAJE);
  //   this.otp = this.route.snapshot.paramMap.get('otp');
  // }

  ngOnInit() { console.log(""); }


  // successAuthenticate(): (response: any) => void {
  //   return resauth => {
  //     if (resauth.state === STATE_ERROR) {
  //       this.router.navigate(['/forbidden']);
  //       return;
  //     }
  //     const payload: any = {};
  //     const tokenDecoded = this.auth.decodeToken(resauth.access_token);
  //     this.cripto.getKeysRemote()
  //       .then(this.successGetKeyRemote(tokenDecoded, resauth, payload))
  //       .catch(this.errorAuthenticate());
  //   };
  // }

  // errorAuthenticate(): (err: any) => void {
  //   return err => {
  //     console.error('Authentication: ', err);
  //     this.router.navigate(['/forbidden']);
  //   };
  // }

  // successGetKeyRemote(tokenDecoded: any, resauth: any, payload: any): (mbaasKey: any) => void {
  //   return mbassKey => {
  //     this.cripto.keyCreator()
  //       .then(this.successKeyCreator(tokenDecoded, resauth, payload))
  //       .catch(this.errorAuthenticate());
  //   };
  // }

  // // AgregarCambios
  // successKeyCreator(tokenDecoded: any, resauth: any, payload: any): (mbaasKey: any) => void {
  //   return (respFront: any) => {
  //     /** This code is made for change theme  according to channel*/
  //     // this.themeService.addTheme();
  //     // this.themeService.removeTheme();
  //     const productId = tokenDecoded.product;
  //     this.auth.saveTokenData(resauth, tokenDecoded.sub, this.saveLocalStorage(productId));
  //     payload.llaveEncriptacion = JSON.stringify(respFront);
  //     payload.clientId = this.auth.getClientId();
  //     this.guard.sendData(this.auth.getClientId(), 'ClientId');
  //     this.workflow.workflow(MBAAS_STEPS.APPBOOT, payload);
  //     this.postMessage.getAndSendPostMessages('catPOST_APPREADY', {});
  //   };
  // }

  // saveLocalStorage(productId: string): boolean {
  //   const save = {
  //     Product_template: true
  //   }[productId];
  //   return save === undefined ? true : save;
  // }

  // callAction(): (close: any) => void {
  //   return (close) => {
  //     const data = this.guard.lastValue(MODAL);
  //     this.postMessage.callPostMessage(data.postmessage);
  //     console.log('End mbaas for APP');
  //   };
  // }

  // /**
  //  * Función que enmascara el numero de cuenta en el popUp.
  //  * @param data Objeto almacenado en el Observable MODAL
  //  */
  // updateMessage(data: any) {
  //   console.log('reemplazo de valores -----> ', data);
  //   const saerchedVar = data.message.match(/\[(.*?)\]/);
  //   if (saerchedVar) {
  //     data.message = data.message.replace(/\[(.*?)\]/g, '****' + data.payload[saerchedVar[1]].slice(-4));
  //   }
  // }
}
