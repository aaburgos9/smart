import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'mbaas-button-continue',
  templateUrl: './button-continue.component.html',
  styleUrls: ['./button-continue.component.scss']
})
export class ButtonContinueComponent {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() disableIf: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() classButton: string = 'button button--primary';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Input() classLabel: string = 'button__label button__label--light';
  @Output() call = new EventEmitter();

  @Input() disabledColor: string = '#d1d5e0';
  @Input() enabledColor: string = '#E1111C';
  @Input() pressColor: string = '#277312';

  click(): void {
    this.call.emit();
  }

  noClick(): void { }

  ngOnInit(): void{
    document.documentElement.style.setProperty('--disabledButton', this.disabledColor);
    document.documentElement.style.setProperty('--enabledButton', this.enabledColor);
    document.documentElement.style.setProperty('--pressButton', this.pressColor);
  }

}
