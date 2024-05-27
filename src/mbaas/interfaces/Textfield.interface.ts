import { CurrencyCodes, TextfieldTypes } from '../core/enums/textfield.enum';
import { Dropdown } from './Dropdown.interface';

/**
* Interfaz para el componente Textfield
*/
export interface Textfield {
  /* Especifica el tipo de textfield a usar*/
  textfieldType: TextfieldTypes;
  /* Id para aplicar accesibilidad*/
  textfieldAccess: string;
  /* Label para el campo de formulario*/
  label?: string;
  /* Label adicional para el campo de formulario*/
  additionalLabel?: string;
  /* Texto del placeholder del textfield*/
  placeholder?: string;
  /* Ruta del icono interno del textfield*/
  trailingIcon?: string;
  /* máximo de caracteres del textfield*/
  maxlength?: number;
}

/**
* Interfaz para el componente Textfield de moneda
*/
export interface TextfieldCurrency {
  /* Id para aplicar accesibilidad*/
  textfieldAccess: string;
  /* Indica que tipo de separador usar en el valor del textfield (. ó ,)*/
  separator: string;
  /* Indica el codigo de moneda para el formato (se debe usar el enum de CurrencyCodes)*/
  currencyCode: CurrencyCodes;
  /* Label para el campo de formulario*/
  label?: string;
  /* máximo de caracteres del textfield*/
  maxlength?: number;
  /* Indica si el textfield es editable o no*/
  editable?: boolean;

}

/**
* Interfaz para el método de formato
*/
export interface currencyFormatter {
  /* Indica el codigo de moneda para el formato (se debe usar el enum de CurrencyCodes)*/
  currencyCode: CurrencyCodes;
  /* Valor a formatear*/
  value: string;
}

/**
* Interfaz para el componente Textfield de dirección
*/
export interface TextfieldAddress {
  /* Label para el campo de formulario*/
  label?: string;
  /* Id para aplicar accesibilidad*/
  textfieldAccess: string;
  /* Array de opciones para el dropdown de tipos de calle*/
  streetOptions: Dropdown;
}
