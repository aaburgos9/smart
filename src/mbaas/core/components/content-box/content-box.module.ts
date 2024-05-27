import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBoxComponent } from './content-box.component';

@NgModule({
  declarations: [
    ContentBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentBoxComponent
  ]
})
export class ContentBoxModule { }
