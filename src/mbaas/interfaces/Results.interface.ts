import { Type } from '@angular/core';

export interface Results {
  label?: string;
  info?: string;
  secondlabel?: string;
  secondinfo?: string;
  subinfo?: { text: string; icon?: string };
  input?: object;
  expand?: boolean;
  toggle?:boolean;
  content?: string;
}
