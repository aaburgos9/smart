import { Catalogo } from './catalogo.enum';

export interface PredictiveListConfig {
  query: Catalogo;
  setValueFn: (item) => string;
  setLabelFn: (item) => string;
  filterFn: (item) => string;
  initialValue: any;
  filters?: {
    property: string;
    key: string
  };
}
