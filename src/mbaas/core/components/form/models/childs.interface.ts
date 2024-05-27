import { Validation } from './validation.interface';
import { PredictiveListConfig } from './predictive-list-config';

export interface Child {
  name: string;
  validation: Validation[];
  placeholder: string;
  predictiveList?: PredictiveListConfig;
  setValueFn?: (item) => string;
  setLabelFn?: (item) => string;
  filterFn?: (item) => string;
}

export interface ChildMap<T> {
  [key: string]: T;
}

