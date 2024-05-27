import { Component, Input, OnInit } from '@angular/core';
import { Results } from '../../../../mbaas/interfaces/Results.interface';

@Component({
  selector: 'mbaas-app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() resultsElements: Results[] = [];
  selected: number = undefined!;
  @Input() type = 'center'


  constructor() { }

  ngOnInit(): void { }
}
