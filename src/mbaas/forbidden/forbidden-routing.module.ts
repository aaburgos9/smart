import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [{
  path: '**',
  pathMatch: 'full',
  component: ForbiddenComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForbiddenRoutingModule { }
