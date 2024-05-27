import { DomSanitizer } from '@angular/platform-browser';
import { Base64ConverterService } from 'src/mbaas/core/service/converter/base64-converter.service';
import { ModalBuilderService } from 'src/mbaas/core/service/ModalBuilder/modal-builder.service';
import { FileService } from 'src/mbaas/core/service/file/file.service';
import { WorkflowService } from './../../service/workflow/workflow.service';
import { GtmService } from 'src/mbaas/core/service/gtm/gtm.service';
import { PostMessagesService } from 'src/mbaas/core/service/postMessages/post-messages.service';
import { SendInformationService } from 'src/mbaas/core/service/SendInformation/send-information.service';
import { jwtTokenGetter, initTraslate } from 'src/mbaas/mbaas.module';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { of } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';
import { CriptoService } from 'src/mbaas/core/service/encryption/cripto.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CatalogoService } from 'src/mbaas/core/service/catalogo/catalogo.service';
import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { FilesPipe } from './files.pipe';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Renderer2, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { TranslateParser, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomFormValidatorsService } from 'src/mbaas/core/components/form/services/custom-form-validators.service';


describe('FilesPipe', () => {
  let component: FilesPipe;
  let fixture: ComponentFixture<FilesPipe>;

  const fakeActivatedRoute = {
    snapshot: { data: {} },
  } as ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilesPipe
      ],
      imports: [RouterTestingModule,
        PipeModuleModule,
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
        WorkflowService,
        FileService,
        ModalBuilderService,
        Base64ConverterService,
        DomSanitizer,
        ComponentFactoryResolver,
        Renderer2,
        Document,
        ChangeDetectorRef,
        CustomFormValidatorsService,
        { provide: FilesPipe, useClass: FilesPipe },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

  fixture = TestBed.createComponent(FilesPipe);
  component = fixture.componentInstance;
  component.payload = {
    pais: 'co',
    modulo: 'co',
    canal: '21',
    lenguaje: 'es'
  };

  component.obser = TestBed.inject(SendInformationService);
  component.catalogo = TestBed.inject(CatalogoService);
  component.postMessageService = TestBed.inject(PostMessagesService);
  component.gtmService = TestBed.inject(GtmService);
  spyOn(component.postMessageService, 'getAndSendPostMessages').and.returnValue();
  spyOn(component.postMessageService, 'callPostMessage').and.returnValue();
  spyOn(component.gtmService, 'createGtm').and.callFake(() => {});
  window.dataLayer = { push: () => {} };
});


  it('should create', () => {
    const sendInfo: SendInformationService<any> =TestBed.get(SendInformationService);
    const AtiveRoute: ActivatedRoute =TestBed.get(ActivatedRoute);
    const WorkflowSer: WorkflowService =TestBed.get(WorkflowService);
    const SendInformationSer: SendInformationService<any> =TestBed.get(SendInformationService<any>);
    const CatalogoSer: CatalogoService =TestBed.get(CatalogoService);
    const GtmSer: GtmService =TestBed.get(GtmService);
    const PostMessagesSer: PostMessagesService =TestBed.get(PostMessagesService);
    const FileSer: FileService =TestBed.get(FileService);
    const ModalBuilderSer: ModalBuilderService =TestBed.get(ModalBuilderService);
    const ComponentFactoryReso: ComponentFactoryResolver =TestBed.get(ComponentFactoryResolver);
    const Base64ConverterSer: Base64ConverterService =TestBed.get(Base64ConverterService);
    const RendererSer: Renderer2 =TestBed.get(Renderer2);
    const changeDetector: ChangeDetectorRef = TestBed.get(ChangeDetectorRef);
    const customValidator: CustomFormValidatorsService = TestBed.get(CustomFormValidatorsService);
    const TranslatePar: TranslateParser =TestBed.get(TranslateParser);
    const DomSaniti: DomSanitizer =TestBed.get(DomSanitizer);
    const Docume: Document =TestBed.get(Document);


    const pipe = new FilesPipe(
      AtiveRoute,
      WorkflowSer,
      SendInformationSer,
      CatalogoSer,
      GtmSer,
      PostMessagesSer,
      FileSer,
      ModalBuilderSer,
      ComponentFactoryReso,
      Base64ConverterSer,
      RendererSer,
      changeDetector,
      customValidator,
      TranslatePar,
      DomSaniti,
      Docume,
    );
    expect(pipe).toBeTruthy();
  });

  it('should call promise', () => {
     const sendInfo: SendInformationService<any> =TestBed.get(SendInformationService);
     const AtiveRoute: ActivatedRoute =TestBed.get(ActivatedRoute);
     const WorkflowSer: WorkflowService =TestBed.get(WorkflowService);
     const SendInformationSer: SendInformationService<any> =TestBed.get(SendInformationService<any>);
     const CatalogoSer: CatalogoService =TestBed.get(CatalogoService);
     const GtmSer: GtmService =TestBed.get(GtmService);
     const PostMessagesSer: PostMessagesService =TestBed.get(PostMessagesService);
     const FileSer: FileService =TestBed.get(FileService);
     const ModalBuilderSer: ModalBuilderService =TestBed.get(ModalBuilderService);
     const ComponentFactoryReso: ComponentFactoryResolver =TestBed.get(ComponentFactoryResolver);
     const Base64ConverterSer: Base64ConverterService =TestBed.get(Base64ConverterService);
     const RendererSer: Renderer2 =TestBed.get(Renderer2);
     const TranslatePar: TranslateParser =TestBed.get(TranslateParser);
     const DomSaniti: DomSanitizer =TestBed.get(DomSanitizer);
     const Docume: Document =TestBed.get(Document);
     const changeDetector: ChangeDetectorRef = TestBed.get(ChangeDetectorRef);
     const customValidator: CustomFormValidatorsService = TestBed.get(CustomFormValidatorsService);


     const pipe = new FilesPipe(
      AtiveRoute,
      WorkflowSer,
      SendInformationSer,
      CatalogoSer,
      GtmSer,
      PostMessagesSer,
      FileSer,
      ModalBuilderSer,
      ComponentFactoryReso,
      Base64ConverterSer,
      RendererSer,
      changeDetector,
      customValidator,
      TranslatePar,
      DomSaniti,
      Docume
    );

    pipe.transform('value').then(result =>{
      expect(result).toEqual(true);
    });

   });

   it('should call API', fakeAsync(() => {
     const sendInfo: SendInformationService<any> =TestBed.get(SendInformationService);
     const AtiveRoute: ActivatedRoute =TestBed.get(ActivatedRoute);
     const WorkflowSer: WorkflowService =TestBed.get(WorkflowService);
     const SendInformationSer: SendInformationService<any> =TestBed.get(SendInformationService<any>);
     const CatalogoSer: CatalogoService =TestBed.get(CatalogoService);
     const GtmSer: GtmService =TestBed.get(GtmService);
     const PostMessagesSer: PostMessagesService =TestBed.get(PostMessagesService);
     const FileSer: FileService =TestBed.get(FileService);
     const ModalBuilderSer: ModalBuilderService =TestBed.get(ModalBuilderService);
     const ComponentFactoryReso: ComponentFactoryResolver =TestBed.get(ComponentFactoryResolver);
     const Base64ConverterSer: Base64ConverterService =TestBed.get(Base64ConverterService);
     const RendererSer: Renderer2 =TestBed.get(Renderer2);
     const TranslatePar: TranslateParser =TestBed.get(TranslateParser);
     const DomSaniti: DomSanitizer =TestBed.get(DomSanitizer);
     const Docume: Document =TestBed.get(Document);
     const changeDetector: ChangeDetectorRef = TestBed.get(ChangeDetectorRef);
     const customValidator: CustomFormValidatorsService = TestBed.get(CustomFormValidatorsService);

     const pipe = new FilesPipe(
      AtiveRoute,
      WorkflowSer,
      SendInformationSer,
      CatalogoSer,
      GtmSer,
      PostMessagesSer,
      FileSer,
      ModalBuilderSer,
      ComponentFactoryReso,
      Base64ConverterSer,
      RendererSer,
      changeDetector,
      customValidator,
      TranslatePar,
      DomSaniti,
      Docume,
         );
          const mockDataObj = 'data';
          const CatalogoServi = TestBed.inject(CatalogoService)
          spyOn(CatalogoServi, 'assetsText').and.returnValue(of(mockDataObj))

          pipe.getFile('vale');
          flush();
          tick();
          expect(CatalogoSer.assetsText).toHaveBeenCalled();
   }));
});
