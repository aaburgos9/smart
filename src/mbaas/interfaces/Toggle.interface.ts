import { FormGroup } from "@angular/forms";

export interface Toggle{
    disabled:boolean;
    checked:boolean;
    nameForm?:string;
    group?:FormGroup;
}
