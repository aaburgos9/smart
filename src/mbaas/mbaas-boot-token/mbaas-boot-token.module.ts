import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MbaasBootTokenRoutingModule } from './mbaas-boot-token-routing.module';
import { MbaasBootTokenComponent } from './mbaas-boot-token/mbaas-boot-token.component';

@NgModule({
  declarations: [
    MbaasBootTokenComponent
  ],
  imports: [
    CommonModule,
    MbaasBootTokenRoutingModule
  ],
  providers: [ ]
})
export class MbaasBootTokenModule { }
