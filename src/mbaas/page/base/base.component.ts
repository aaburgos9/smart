import { Component, ComponentFactoryResolver, OnDestroy, Renderer2, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CatalogoService } from 'src/mbaas/core/service/catalogo/catalogo.service';
import { Base64ConverterService } from 'src/mbaas/core/service/converter/base64-converter.service';
import { FileService } from 'src/mbaas/core/service/file/file.service';
import { GtmService } from 'src/mbaas/core/service/gtm/gtm.service';
import { ModalBuilderService } from 'src/mbaas/core/service/ModalBuilder/modal-builder.service';
import { PostMessagesService } from 'src/mbaas/core/service/postMessages/post-messages.service';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { WorkflowService } from 'src/mbaas/core/service/workflow/workflow.service';
import { APP_FINISH, CLIENT_ID, ONCALL, PAYLOAD, SERVER_ENROLLMENT_KEY } from 'src/mbaas/mbaas.const';
import { DOCUMENT } from '@angular/common';
import { TranslateParser } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { KINDS } from 'src/mbaas/mbaas.kind.const';
import { IDocumentType } from 'src/mbaas/interfaces/DocumentType';
import { CustomFormValidatorsService } from 'src/mbaas/core/components/form/services/custom-form-validators.service';
declare global {
  interface Window {
    dataLayer: any;
  }
}
@Component({
  selector: 'mbaas-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {

  public disableButton: boolean;
  public stepId: string;
  private payloadSubscription: Subscription;
  public payload: { [key: string]: any | string };
  public routingData: any;

  constructor(
    public  router: ActivatedRoute,
    private workflow: WorkflowService,
    public obser: SendInformationService<any>,
    public catalogo: CatalogoService,
    public gtmService: GtmService,
    public postMessageService: PostMessagesService,
    public fileService: FileService,
    public modalBuilder: ModalBuilderService,
    public resolver: ComponentFactoryResolver,
    public base64toBlob: Base64ConverterService,
    protected renderer: Renderer2,
    protected cdr: ChangeDetectorRef,
    public validationCustom: CustomFormValidatorsService,
    //public geography: GeographyService,
    public parser: TranslateParser,
    public domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) protected document: Document
  ) {
    if (this.obser) {
      this.payloadSubscription = this.obser.getData(PAYLOAD).subscribe(this.responsePayload());
      this.router.data.subscribe(this.responseRouteData());
      this.obser.getData(ONCALL).subscribe(this.responseFinisOnCall());
    }
  }

  responsePayload(): (response: { [key: string]: any; }) => void {
    return (response: { [key: string]: any; }) => {
      if (response) {
        this.payload = response;
      }
    };
  }

  responseFinisOnCall(): (response: any) => void {
    return response => {
      this.disableButton = !!response;
    };
  }

  responseRouteData(): (data: { [key: string]: any; }) => void {
    return (data: { [key: string]: any; }) => {
      this.stepId = data.stepId;
      this.routingData = data;
    };
  }

  onCall(payload: any, modulo?: string, stepId?: string): void {
    this.obser.sendData(true, ONCALL);
    this.disableButton = true;
    this.workflow.workflow(this.stepId, payload(), modulo);
  }

  params(keys: Array<string>): Params {
    const params: Params = {};
    keys.map(item => {
      params[item] = this.obser.lastValue(item);
      return item;
    });
    return params;
  }

  get serverEnrollmentKey(): string {
    return this.obser.lastValue(SERVER_ENROLLMENT_KEY);
  }

  set serverEnrollmentKey(serverEnrollmentKey: string) {
    this.obser.sendData(serverEnrollmentKey, SERVER_ENROLLMENT_KEY);
  }

  get isDesktopDevice(): boolean {
    const ua = navigator.userAgent.toLowerCase();
    // eslint-disable-next-line max-len
    return !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4)));
  }

  saveImages(objImage: any): Observable<any> {
    return  this.fileService.uploadImages(objImage);
  }

  ngOnDestroy(): void {
    try {
      this.obser.unSubscribe(this.payloadSubscription); 
    } catch (error) {
      console.log('Element Undefined: ', error);
    }
  }

  getClientId() {
    return this.obser.lastValue(CLIENT_ID);
  }

  setTitle(title: string): void {
    this.postMessageService.getAndSendPostMessages('catPOST_SETTITLES', {
      title
    });
  }

  appFinish(status: string, statusCode: number, statusMessage: string = 'finish'): Observable<any> {
    this.obser.sendData(false, APP_FINISH);
    this.postMessageService.getAndSendPostMessages(KINDS.POST_APPFINISH, { status, statusCode, statusMessage });
    return this.obser.getData(APP_FINISH);
  }

  getDocumentTypeByCode(arrayDocument: IDocumentType[], code:string): string {
    let labelDocumentType = '';
    arrayDocument.forEach((dt) => { 
        if(dt.value === code){
          labelDocumentType = dt.label;
        }
    });
    return labelDocumentType;
  }

  /**
   * Funcion encargada de agregar una clase al body de Angular
   * @param className string nombre de la clase a ser agregada
   */
  addBodyClass( className: string ): void {
    this.renderer.addClass(this.document.body, className);
  }

  /**
   * Funcion encargada de remover una clase al body de Angular
   * @param className string nombre de la clase a ser agregada
   */
  removeBodyClass( className: string ): void {
    this.renderer.removeClass(this.document.body, className);
  }

}
