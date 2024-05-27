import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AlertModalTMAComponent } from './alert-modal-tma/alert-modal-tma.component';
import { ModalComponent } from './modal.component';
import { PipeModuleModule } from '../../pipes/pipe-module.module';
import { InfoModalTMAComponent } from './info-modal-tma/info-modal-tma.component';
import { ButtonContinueModule } from '../button-continue/button-continue.module';
import { TranslateModule } from '@ngx-translate/core';
import { PointSeparatorPipe } from '../../pipes/pipeSeparator/point-separator.pipe';
import { HtmlModalTMAComponent } from './html-modal-tma/html-modal-tma.component';
import { DirectivesModule } from '../../directives/directives.mudule';

@NgModule({

  declarations: [
    AlertModalTMAComponent,
    InfoModalTMAComponent,
    ModalComponent,
    HtmlModalTMAComponent
  ],
  exports: [
    AlertModalTMAComponent,
    InfoModalTMAComponent,
    HtmlModalTMAComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PipeModuleModule,
    ButtonContinueModule,
    TranslateModule,
    DirectivesModule
  ],
  providers: [
    CurrencyPipe,
    PointSeparatorPipe
  ]
})
export class ModalModule { }
