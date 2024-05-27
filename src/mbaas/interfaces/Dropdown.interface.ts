export interface Dropdown {
  /* Label para el campo de formulario*/
  label?: string,
  /* Id para aplicar accesibilidad*/
  dropdownAccess?: string,
  /* Texto que quiero que aparezca por defecto, aplica como placeholder*/
  defaultOption?: string,
  /* url del icono que se muestra en el dropdown*/
  uniqueIcon?: string,
  /* Nombre del atributo del objeto que quiero que se muestre en las opciones*/
  optionKey?: string,
  /* Nombre del atributo del objeto que quiero que se muestre en la descripción de las opciones*/
  descriptionKey?: string,
  /* Array de opciones a mostrar en el dropdown*/
  options: any[],
}

