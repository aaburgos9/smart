export interface ResultsGroup {
  // label titulo
  label: string,
  valorLabel?: any;
  formatoLavel?: string;

  // label value
  value: string | number,
  formato?: string;
  plantilla?: string;


  additionalLabel?: string,
  additionalValue?: additionalValue,
  helper?: string,
  badge?: string
}


interface additionalValue {
  label?: string,
  robotoText?: string,
  condensedText?: string
}
