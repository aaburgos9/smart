import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MobileLayoutComponent } from './mobile-layout/mobile-layout.component';



@NgModule({
  declarations: [
    MobileLayoutComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage
  ],
  exports: [
    MobileLayoutComponent
  ]
})
export class LayoutsModule { }
