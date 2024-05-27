import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { PipeModuleModule } from 'src/mbaas/core/pipes/pipe-module.module';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.mudule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderEnterpriseModule } from '../core/components/header-enterprise/header-enterprise.module';
import { FormModule } from '../core/components/form/form.module';
import { ResultsModule } from '../core/components/results/results.module';
import { ContentBoxModule } from '../core/components/content-box/content-box.module';
import { HeadersModule } from '../core/components/headers/headers.component.module';
import { TitleModule } from '../core/components/title/title.module';
import { LoginComponent } from './account/login/login.component';
import { FooterModule } from '../core/components/footer/footer.module';
import { ButtonsModule } from '../core/components/button/buttons.module';
import { LayoutsModule } from '../core/components/layouts/layouts.module';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';




@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    NewPasswordComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderEnterpriseModule,
    PageRoutingModule,
    PipeModuleModule,
    DirectivesModule,
    FormModule,
    ResultsModule,
    ContentBoxModule,
    HeadersModule,
    TitleModule,
    FooterModule,
    ButtonsModule,
    LayoutsModule,
    NgOptimizedImage

  ]
})
export class PageModule {
}
