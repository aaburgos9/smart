import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config.interface';

export interface DynamicForm {
  group: FormGroup;
  config: FieldConfig;
}
