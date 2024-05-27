import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MbaasBootRoutingModule } from './mbaas-boot-routing.module';
import { MbaasBootComponent } from './mbaas-boot/mbaas-boot.component';
import { AuthService } from '../core/service/authentication/auth.service';
import { WorkflowService } from '../core/service/workflow/workflow.service';

@NgModule({
  declarations: [
    MbaasBootComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MbaasBootRoutingModule
  ],
  providers: [
    WorkflowService,
    AuthService
  ]
})
export class MbaasBootModule { }
