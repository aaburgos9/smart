import { Radio } from './radio.interface';
import { Validation } from './validation.interface';
import { FormTypes } from '../config/form-config';
import { Catalogo } from './catalogo.enum';
import { Check } from './check.interface';
import { CheckLabel } from './checkLabel.interface';
import { TextfieldTypes } from 'src/mbaas/core/enums/textfield.enum';
import { Payment } from 'src/mbaas/interfaces/Payment.interface';
import { CurrencyCodes } from 'src/mbaas/interfaces/textfield.enum';

/*export interface FieldConfig {
  type: FormTypes;
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  childs?: ChildMap<Child>;
  placeholder?: string;
  inputType?: 'text' | 'number' | 'email';
  validation?: Validation[];
  value?: any;
  predictiveList?: PredictiveListConfig;
  toggleChilds?: FieldConfig[];
  threeLevelConfig?: any[];
  inputs?: any[];
}*/

export interface FieldConfig {
  type?: FormTypes;
  name: string;
  label?: string;
  columns?: any;
  placeholder?: string;
  data?: any;
  functions?: {
    setValue: (item) => string;
    setLabel: (item) => string;
    filter: (item) => string;
  };
  catalogoFilter?: {
    key: string;
    property: string;
  };
  disabled?: boolean;
  inputType?:
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'range'
    | 'password'
    | 'formAddres'
    | 'otp'
    | 'tel';
  value?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  options?: string[] | any;
  children?: FieldConfig[];
  validation?: Validation[];
  upperCase?: boolean;
  tooltip?: {
    img: string;
    text: string;
  };
  radioButtons?: Radio[];
  checkLabel?: CheckLabel;
  checkedBox?: boolean;
  specialChart?: boolean;
  onlyLetters?: boolean;
  onlyNumbers?: boolean;
  readonly?: boolean;
  valueSelect?: string;
  optionShow?: string;
  textTooltip?: any;
  restrict?: string;
  checkButtons?: Check[];
  mskMoney?: boolean;
  failBorder?: boolean;
  dollars?: boolean;
  isHidden?: boolean;
  ignoreList?: boolean;
  fromServer?: boolean;
  balance?: boolean;
  showBalance?: boolean;
  saldo?: number;
  labelBalance?: string;
  addClass?: string;
  showIf?: { parentField: string; values: string[]; hideReadonly: boolean };
  dateMin?: string;
  dateMax?: string;
  dataParams?: string;
  seeMoreText?: {
    more: string;
    less: string;
  };
  listCount?: number;
  icon?: string;
  textfieldType?: TextfieldTypes;
  textfieldAccess?: string;
  directionHelper?: string;
  trailingIcon?: any;
  predictiveAccess?: string;
  isEditable?: boolean;
  inputValue?: string;
  tagging?: any;
  margin?: boolean;
  paymentData?: Payment[];
  onBlur?: () => void;
  acctionToInput?: (evento) => void;
  showErrorLabel?: boolean;
  errorLabel?: string;
  showDocIcon?: boolean;
  infoText?: string;
  activarVerMas?: boolean;
  detailsVerMenos?: string;
  detailsVerMas?: string;
  acctionVerMas?: (event) => void;
  infoIcon?: string;
  buttonInInput?: boolean;
  imgButtonInInput?: string;
  actionButtonInInput?: () => void;
  groupCheckType?: number;
  additionalLabel?: string;
  dataSelected?: any;
  bottomsheeTitlekangaroo?: string;
  currencyCode?: CurrencyCodes;
  separator?: string;
  editable?: boolean;
  dropdownAccess?: string;
  optionsDropdown?: any[];
  defaultOption?: string;
  optionKey?: string;
  descriptionKey?: string;
  


}
