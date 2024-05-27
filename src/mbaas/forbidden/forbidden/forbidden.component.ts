import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TRANSLATE } from 'src/mbaas/mbaas.const';

@Component({
  selector: 'mbaas-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(TRANSLATE.LENGUAJE);
  }

}
