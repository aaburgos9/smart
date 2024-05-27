import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'mbaas-ghost-button',
  templateUrl: './ghost-button.component.html',
  styleUrls: ['./ghost-button.component.scss'],
  animations: [
      trigger('rotatedState', [
      state('off', style({ transform: 'rotate(0)' })),
      state('on', style({ transform: 'rotate(-180deg)' })),
      transition('on <=> off', [
      animate('0.2s ease-out')
      ])
    ])
  ]
})
export class GhostButtonComponent implements OnChanges {

  /**
   * Input que indica que tipo de ghost button será, 'toggle' o 'infinite';
   */
  @Input() buttonType: 'toggle' | 'infinite' = 'toggle';
  /**
   * Input con el texto de ver más, tiene texto por defecto pero también se puede modificar desde afuera;
   */
  @Input() showMoreText: string = 'Ver más';
  /**
   * Input con el texto de ver menos, tiene texto por defecto pero también se puede modificar desde afuera;
   */
  @Input() showLessText: string = 'Ver menos';

  /**
   * Output que emite el estado del toggle para desde el padre saber si hacer toggle o cargar información de forma infinita.
   */
  @Output() toggleState: EventEmitter<'on' | 'off'> = new EventEmitter();

  /**
   * variable de tipo string del componente para mantener el texto del botón de forma local.
   */
  public buttonText: string = this.showMoreText;
  /**
   * variable de tipo boolean local que mantiene el estado del toggle true o false.
   */
  public toggleOn: boolean = false;

  ngOnChanges(): void {
    this.buttonText = this.showMoreText;
  }

/**
 * Esta función identifica que tipo de botón es (toggle o infinite) para alternar el texto del botón y emitir el estado segurn el tipo.
 */
  public onButtonAction (): void {
    if (this.buttonType === 'toggle') {
      this.toggleOn = !this.toggleOn;
      this.buttonText = this.toggleOn ? this.showLessText : this.showMoreText;
      this.toggleState.emit(this.toggleOn ? 'on' : 'off');

    } else if (this.buttonType === 'infinite') {
      this.buttonText = this.showMoreText;
      this.toggleState.emit('on')
    }
  }
}
