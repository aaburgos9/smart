import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootResolverServiceService } from '../core/service/bootResolverService/boot-resolver-service.service';
import { MbaasBootComponent } from './mbaas-boot/mbaas-boot.component';


const routes: Routes = [
  {
    path: ':otp',
    component: MbaasBootComponent,
    resolve: {
      obj: BootResolverServiceService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MbaasBootRoutingModule { }
