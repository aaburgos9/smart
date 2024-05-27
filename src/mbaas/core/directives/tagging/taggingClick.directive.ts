import { Directive, HostListener, Input } from '@angular/core';
import { RUTA } from 'src/mbaas/mbaas.const';
import { GtmService } from '../../service/gtm/gtm.service';

@Directive({
  selector: '[mbaasTaggingClick]',
})
export class TaggingClickDirective {
  @Input() mbaasTaggingKey: string;
  @Input() mbaasTaggingClick: string;
  @Input() mbaasTaggingValue: string;
  @Input() mbaasTaggingBlur: boolean = false;
  @Input() mbaasTaggingBlurValue: string;
  

  @HostListener('click') click() {
    if (!this.mbaasTaggingBlur) {
      if (this.mbaasTaggingValue) {
        this.gtm.setDataTagging(this.mbaasTaggingClick, this.mbaasTaggingValue);
      }
      this.gtm.setDataTagging(RUTA, this.mbaasTaggingKey);
      this.gtm.createGtm(this.mbaasTaggingClick, this.mbaasTaggingKey);
    }
  }

   @HostListener('focusout') focusout() {
    console.log('focusout', this.mbaasTaggingClick);
     if (this.mbaasTaggingBlur && this.mbaasTaggingBlurValue && this.mbaasTaggingBlurValue !== '') {
       this.gtm.setDataTagging(this.mbaasTaggingClick, this.mbaasTaggingBlurValue);
     }
  }

  constructor(private gtm: GtmService) { }
}
