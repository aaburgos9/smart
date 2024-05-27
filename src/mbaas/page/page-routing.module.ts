import { NgModule } from '@angular/core';
import { AccessStepGuard } from 'src/mbaas/core/guard/access-step.guard';
import { Routes, RouterModule } from '@angular/router';
import { MBAAS_STEPS } from 'src/mbaas/mbaas.const';
import { MTS001Component } from './mts001/mts001.component';
import { LoginComponent } from './account/login/login.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { NewPasswordComponent } from './account/new-password/new-password.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {
    path: MBAAS_STEPS.MTS001.ROUTE,
    component:MTS001Component,
    canActivate: [
      AccessStepGuard
    ],
    data: {
      stepId: MBAAS_STEPS.MTS001.STEP
    }
  },
  {
    path: MBAAS_STEPS.LOGIN001.ROUTE,
    component:LoginComponent,
    canActivate: [
      AccessStepGuard
    ],
    data: {
      stepId: MBAAS_STEPS.LOGIN001.STEP
    }
  },
  {
    path: MBAAS_STEPS.RESETPASS001.ROUTE,
    component:ResetPasswordComponent,
    canActivate: [
      AccessStepGuard
    ],
    data: {
      stepId: MBAAS_STEPS.RESETPASS001.STEP
    }
  },
  {
    path: MBAAS_STEPS.NEWPASS001.ROUTE,
    component:NewPasswordComponent,
    canActivate: [
      AccessStepGuard
    ],
    data: {
      stepId: MBAAS_STEPS.NEWPASS001.STEP
    }
  },
  {
    path: MBAAS_STEPS.REGISTER001.ROUTE,
    component:RegisterComponent,
    canActivate: [
      AccessStepGuard
    ],
    data: {
      stepId: MBAAS_STEPS.REGISTER001.STEP
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
