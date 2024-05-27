import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mbaas-header-enterprise',
  templateUrl: './header-enterprise.component.html',
  styleUrls: ['./header-enterprise.component.scss']
})
export class HeaderEnterpriseComponent implements OnInit {

  @Input() title = '';
  @Input() headerColor1 = '';
  @Input() headerColor2 = '';
  @Input() iconArrowBack = '../cdte/assets/icons/extra-icons/icon-arrowBack-white.svg';
  @Input() closeBtn = '../cdte/assets/icons/extra-icons/icon-close-white.svg';
  @Input() showArrow = true;
  @Output() closeFunction = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  callClosePostmessage(): void {
    this.closeFunction.emit(true);
  }

}
