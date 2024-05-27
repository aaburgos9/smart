import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaggingClickDirective } from './tagging/taggingClick.directive';
import { TaggingPageViewDirective } from './tagging/taggingPageView.directive';

@NgModule({
  declarations: [
    TaggingClickDirective,
    TaggingPageViewDirective
  ],
  imports: [CommonModule],
  exports: [
    TaggingClickDirective,
    TaggingPageViewDirective
  ]
})
export class DirectivesModule {}
