import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { TextfieldTypes } from 'src/mbaas/core/enums/textfield.enum';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'mbaas-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.scss']
})
export class FormTextFieldComponent implements OnInit {

  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
    /**
  * input que indica la orientación de los botones
  */
 

  @ViewChild('input') input: any;

  /**
  * input que le indica al componente si es invalido para agregar la clase .textField__invalidField
  */
  @Input() invalidField: boolean | ValidationErrors | null = false ;
  /**
  * Evento que se emite al dar click en el botón de editar o ver contraseña (opcional).
  */
  @Output() onEmitButtonAction = new EventEmitter();

  public showIcon: boolean = false;
  public icon!: string;
  public inputmode: string = '';
  public type: string = 'text';
  public value: string = '';
  public disabled: boolean = false;
  public localInputValue: string = '';
  public showPassword: boolean = false;
  public isFilledOut: boolean = false;
  public isEditableField!: boolean;
  /**
  * Clases del div contenedor del input
  */
  private simpleClass: string = 'smart-textField';
  private editTrailingIconClass: string = 'smart-textField__trailingIcon';
  private editClass: string = 'smart-textField__edit';

  private invalidFieldClass: string = 'smart-textField__invalidField';
  private filledOutClass: string = 'smart-filledOut';

  private passwordClass: string = 'smart-textField__password';
  private viewPasswordClass: string = 'smart-textField__password--view';

  // ------------------------
  public divNgClass: string = this.simpleClass;
  valid: boolean = false;

  ngOnInit(): void {
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
    this.formControl.setValue(this.config.value ? this.config.value : '');

    this.config.textfieldType = this.config.textfieldType || TextfieldTypes.SIMPLE;
    this.config.textfieldAccess= this.config.textfieldAccess || '';
    this.config.label = this.config.label || '';
    this.validateTextfieldType();
  }




  changeValue(e: Event) {
    this.writeValue((e.target as HTMLInputElement).value);
  }

  writeValue(value: string) {
    this.value = value;
    this.localInputValue = value;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }




  /**
   * Esta función establece el tipo y el modo de entrada de un campo de texto en función de su tipo especificado.
   */
  public validateTextfieldType(): void {
    const isNumericField: boolean = this.config.textfieldType == TextfieldTypes.NUMBER || this.config.textfieldType == TextfieldTypes.PERCENTAGE;
    const isPasswordField: boolean = this.config.textfieldType == TextfieldTypes.PASSWORD;
    const isPasswordNotShowField: boolean = this.config.textfieldType == TextfieldTypes.PASSWORD_NOT_DO_SHOW;
    this.isEditableField = this.config.textfieldType == TextfieldTypes.EDIT || this.config.textfieldType == TextfieldTypes.EDIT_TRAILING_ICON;

    this.isEditableField ? (this.showIcon = true, this.icon = './assets/icons/default-icons/icon-edit.svg'): null;
    isNumericField ? (this.type = 'tel', this.inputmode = 'numeric'): null;
    isPasswordField ? this.hidePass() : null;
    isPasswordNotShowField ? this.stylePassword(): null;
  }

  /**
   * Esta función devuelve una cadena de clases CSS según el tipo de campo de texto y si es
   * completado o inválido.
   * @param {boolean} isFilledOut - A boolean value indicating whether the textfield is filled out or
   * not.
   * @returns un string que representa las clases de CSS que deben aplicarse al textfield
   * en función de su tipo y de si se rellena o no. La cadena incluye las clases CSS para el
   * tipo de campo de texto (por ejemplo, "editar", "contraseña"), cualquier clase adicional para campos no válidos y una clase para
   * cuando el campo está lleno.
   */
  validateInputClass(isFilledOut: boolean): string {
    if (this.config.disabled) this.divNgClass = 'smart-textField smart-textField__disabled';
    if (this.config.textfieldType === TextfieldTypes.EDIT_TRAILING_ICON) this.divNgClass = this.editTrailingIconClass;
    if (this.config.textfieldType === TextfieldTypes.EDIT) this.divNgClass = this.editClass;
    if (this.config.textfieldType === TextfieldTypes.PASSWORD || this.config.textfieldType === TextfieldTypes.PASSWORD_LAST_CHARACTER) this.divNgClass = this.passwordClass;
    if (this.config.textfieldType === TextfieldTypes.PASSWORD_NOT_DO_SHOW) this.divNgClass = this.passwordClass;
    if (this.invalidField) this.divNgClass = this.config.textfieldType === TextfieldTypes.EDIT_TRAILING_ICON ? `${this.editTrailingIconClass} ${this.invalidFieldClass}` : this.invalidFieldClass;
    return isFilledOut ?  this.divNgClass + this.filledOutClass : this.divNgClass;
  }

  /**
   * La función maneja diferentes acciones para diferentes tipos de campos de texto, incluida la habilitación de la edición.
   * y alternar la visibilidad de la contraseña.
   */
  onActionTextfield () {
    if (this.isEditableField) {

      this.showIcon = false;
      this.isEditableField= false;
      this.input.nativeElement.focus()
      this.input.nativeElement.select()

    } else if (this.config.textfieldType == TextfieldTypes.PASSWORD) {

      if (this.showPassword) {
        this.hidePass();
        this.showPassword = false;
      } else {
        this.showPass();
      }
    }
  }

  stylePassword() {
    this.showIcon = false
    this.divNgClass = this.passwordClass;
    this.type = 'password'
  }

  /**
  * La función oculta el campo de entrada de la contraseña y cambia el icono para mostrar una contraseña oculta.
  */
  hidePass() {
    this.showIcon = true
    this.divNgClass = this.passwordClass;
    this.type = 'password'
    this.icon = './assets/icons/default-icons/icon-show-pass.svg';
  }

  /**
  * La función establece la clase, el tipo, el icono y el valor booleano para mostrar una contraseña.
  */
  showPass() {
    this.divNgClass = this.viewPasswordClass;
    this.type = 'text';
    this.showPassword = true;
    this.icon = './assets/icons/default-icons/icon-hide-pass.svg';
  }

  /**
  * La función verifica el tipo de textfield para ejecutar el metodo necesario.
  * @param {Event} e - Argumento a la función que contiene información sobre el evento que activó la función,
  * como el elemento de destino y el tipo de evento.
  */
  action(e: Event): void {
    this.isFilledOut = (e.target as HTMLInputElement).value !== '';

    if (this.config.textfieldType === TextfieldTypes.PASSWORD_LAST_CHARACTER) this.seeLastCharacter(e);
    else if (this.config.textfieldType === TextfieldTypes.PERCENTAGE) this.input.nativeElement.value !== '0' ? this.setPercentage(e) : this.input.nativeElement.value = '';
    else this.writeValue((e.target as HTMLInputElement).value);
  }

  /**
  * La función reemplaza todos los caracteres del textfield con puntos excepto el último carácter,
  * que se muestra.
  * @param {Event} e - Argumento a la función que contiene información sobre el evento que activó la función,
  * como el elemento de destino y el tipo de evento.
  */
  seeLastCharacter(e: Event) {
    let tempValue = (e.target as HTMLInputElement).value;
    let lastCharacter = tempValue.charAt(tempValue.length - 1);
    let elementValue = tempValue.length;
    this.value = '';
    for (let i = 0; i < elementValue - 1; i++) {
      this.value += '•';
    }
    this.value += lastCharacter;
    this.writeValue(this.value);
  }

  /**
  * La función establece el valor porcentual del textfield y realiza comprobaciones de validación.
  * @param {Event} e - Argumento a la función que contiene información sobre el evento que activó la función,
  * como el elemento de destino y el tipo de evento
  */
  setPercentage(e: Event) {
    let elementValue = (e.target as HTMLInputElement).value;

    elementValue = elementValue.replace('%', '');
    elementValue += ''

    this.writeValue(elementValue);

    if (this.value !== '') this.writeValue(`${elementValue}%`);
    if (!this.value.includes('%')) this.writeValue('');
    if (this.valid && this.value === '%') this.writeValue('');

    this.valid = true;
  }

  /**
  * Esta función evita que se escriban ciertas teclas y establece la posición del caret del textfield
  * según su tipo.
  * @param {KeyboardEvent} e - Argumento a la función que contiene información sobre el evento que activó la función,
  * como el elemento de destino y el tipo de evento.
  * @returns If the `textfieldType` is not `TextfieldTypes.PERCENTAGE`, the function will return nothing
  * (`undefined`).
  */
  focusCaret(e: KeyboardEvent) {
    if (e.key === '.' || e.key === '$' || e.key === '%') e.preventDefault();

    if (this.config.textfieldType === TextfieldTypes.PERCENTAGE) {
      let start = this.value.length - 1;
      let end = this.value.length - 1;
      (e.target as HTMLInputElement).setSelectionRange(start, end);
    } else {
      return
    }

  }

  /**
  * La función verifica y da formato a la entrada del usuario según el tipo de campo de texto especificado.
  */
  verifyInput() {
    if (this.config.textfieldType === TextfieldTypes.NUMBER) {
      const regex = this.input.nativeElement.value.replace(/[^0-9]/g, '').replace(/(\..?)\../g, '$1');
      this.input.nativeElement.value = regex;
    } else if (this.config.textfieldType === TextfieldTypes.PERCENTAGE) {
      const regex = this.input.nativeElement.value.replace(/[^0-9$.%]*/g, '').replace(/(\..?)\../g, '$1');
      this.input.nativeElement.value = regex;
    }
  }
}

