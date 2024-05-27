import { Component, Input } from '@angular/core';

@Component({
  selector: 'mbaas-button-container',
  templateUrl: './button-container.component.html',
  styleUrls: ['./button-container.component.scss']
})
export class ButtonContainerComponent {
  /**
  * input que indica la orientación de los botones
  */
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  /**
  * input que indica el valor en pixeles del espaciado entre botones
  */
  @Input() spaceBetweenBtns: string = '';

}
