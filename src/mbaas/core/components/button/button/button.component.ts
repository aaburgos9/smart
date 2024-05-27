import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ButtonClasses } from 'src/mbaas/core/enums/button.enum';


@Component({
  selector: 'mbaas-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent{
  /**
  * input con la clase de botón a usar
  */
  @Input() classButton: string = ButtonClasses.PRIMARY;
  /**
  * input que indica si el botón es disabled
  */
  @Input() disabled: boolean = false;
  /**
  * input con el type del botón,
  */
  @Input() buttonType: string = 'button';
  /**
  * input con el label del botón,
  */
  @Input() label: string = '';


  @Output() call = new EventEmitter();

  public mouseY: number = 0;
  public mouseX: number = 0;
  public showEffect: boolean = false;


  constructor() { }

/**
 * Esta función establece la posición de un elemento en función de las coordenadas del mouse y activa una visualización
 * de la animación.
 * @param {MouseEvent} e - MouseEvent - Objeto del evento que se pasa como parametro a la función. Este contiene información del evento del mouse
 * como la posición del cursor (offsetX and offsetY).
 */
  public setPosition(e: MouseEvent) {

    this.showEffect = true;
    this.mouseY = e.offsetY;
    this.mouseX = e.offsetX;

    setTimeout(() => {
      this.showEffect = false;
    }, 1000);

  }

  click(): void {
    console.log('click');
    if (!this.disabled) {
      this.call.emit();
    }
    this.noClick();
  }

  noClick(): void {

  }

}
