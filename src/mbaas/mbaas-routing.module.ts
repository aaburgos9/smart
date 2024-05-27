import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MBAAS_ROUTING } from './mbaas.const';


export const routes: Routes = [
  {
    path: MBAAS_ROUTING.APPBOOT,
    pathMatch: 'full',
    redirectTo: MBAAS_ROUTING.FORBBIDEN
  },
  {
    path: MBAAS_ROUTING.APPBOOT,
    loadChildren: () => import('./mbaas-boot/mbaas-boot.module').then(mod => mod.MbaasBootModule)
  },
  {
    path: MBAAS_ROUTING.APPBOOTTOKEN,
    pathMatch: 'full',
    redirectTo: MBAAS_ROUTING.FORBBIDEN
  },
  {
    path: MBAAS_ROUTING.APPBOOTTOKEN,
    loadChildren: () => import('./mbaas-boot-token/mbaas-boot-token.module').then(mod => mod.MbaasBootTokenModule)
  },
  {
    path: MBAAS_ROUTING.PROYECTO,
    pathMatch: 'full',
    redirectTo: MBAAS_ROUTING.FORBBIDEN
  },
  {
    path: MBAAS_ROUTING.PROYECTO,
    loadChildren: () => import('./page/page.module').then(mod => mod.PageModule)
  },
  {
    path: MBAAS_ROUTING.FORBBIDEN,
    loadChildren: () => import('./forbidden/forbidden.module').then(mod => mod.ForbiddenModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: MBAAS_ROUTING.FORBBIDEN
  },
  {
    path: '**',
    redirectTo: MBAAS_ROUTING.FORBBIDEN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: environment.useHash,
    preloadingStrategy: PreloadAllModules,
})],
  exports: [RouterModule]
})
export class MbaasRoutingModule { }
