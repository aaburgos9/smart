import { AfterViewInit, Directive, Input } from '@angular/core';
import { GtmService } from '../../service/gtm/gtm.service';

@Directive({
  selector: '[mbaasTaggingPageView]',
})
export class TaggingPageViewDirective implements AfterViewInit {
  @Input() mbaasTaggingPageView: any;
  @Input() mbaasTaggingKey: string;

  constructor(private gtm: GtmService) { }

  ngAfterViewInit() {
    if (!this.mbaasTaggingPageView) {
      this.mbaasTaggingPageView = 'pageView';
    }
    console.log('page view', this.mbaasTaggingPageView);
    this.gtm.createGtm(this.mbaasTaggingPageView, this.mbaasTaggingKey);
  }
}
