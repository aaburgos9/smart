import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mbaas-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.sass']
})
export class ButtonBackComponent {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() disabled: boolean = false;
  @Output() call = new EventEmitter();

  constructor() { }

  // ngOnInit() {}

  click(): void {
    this.call.emit();
    this.noClick();
  }

  noClick(): void {

  }
}
