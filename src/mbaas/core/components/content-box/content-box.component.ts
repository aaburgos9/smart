import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mbaas-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['./content-box.component.scss'],
})
export class ContentBoxComponent implements OnInit {
  @Input() large: boolean = false;
  @Input() noBG: boolean = false;
  @Input() decoration: string = '';
  @Input() padding?: number;
  @Input() paddingBottom? =  16;

  constructor() {}

  ngOnInit(): void {}
}
