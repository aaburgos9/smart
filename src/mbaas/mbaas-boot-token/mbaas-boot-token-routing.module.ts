import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootResolverServiceService } from '../core/service/bootResolverService/boot-resolver-service.service';
import { MbaasBootTokenComponent } from './mbaas-boot-token/mbaas-boot-token.component';


const routes: Routes = [
  {
    path: 'token',
    component: MbaasBootTokenComponent,
    resolve: {
      obj: BootResolverServiceService
    }
  },
  // ToDo: Por favor borrar para certificación
  {
    path: 'token/:otp',
    component: MbaasBootTokenComponent,
    resolve: {
      obj: BootResolverServiceService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MbaasBootTokenRoutingModule { }
