import { Type } from "@angular/core";


export interface Tab{
    label?:string;
    icon?:string;
    component?:Type<any>;
    input?:any;
    path:string;
}