import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonContainerComponent } from './button-container/button-container.component';
import { GhostButtonComponent } from './ghost-button/ghost-button.component';


@NgModule({
  declarations: [
    ButtonComponent,
    ButtonContainerComponent,
    GhostButtonComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    ButtonContainerComponent,
    GhostButtonComponent,
  ]
})
export class ButtonsModule { }
