export interface Predictive {
  /* Label para el campo de formulario*/
  label?: string,
  /* Texto del placeholder del input*/
  placeholder?: string;
  /* Id para aplicar accesibilidad*/
  predictiveAccess?: string,
  /* booleano que indica si el predictivo arranca como editable*/
  isEditable?: boolean,
  /* valor por defecto que quiero que tenga el componente*/
  inputValue?: string,
  /* Nombre del atributo del objeto que quiero que se muestre en las opciones*/
  optionKey?: string,
  /* Nombre del atributo del objeto que quiero que se muestre en la descripción de las opciones*/
  descriptionKey?: string,
  /* Array de opciones a mostrar en el dropdown*/
  options: any[],
}

