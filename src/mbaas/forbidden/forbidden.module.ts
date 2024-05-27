import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    ForbiddenRoutingModule,
    TranslateModule
  ]
})
export class ForbiddenModule { }
