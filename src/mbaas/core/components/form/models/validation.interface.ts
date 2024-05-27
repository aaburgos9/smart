import { ValidatorFn } from '@angular/forms';

export interface Validation {
  validator: ValidatorFn;
  type: string;
  params?: string;
  label: string;
}
