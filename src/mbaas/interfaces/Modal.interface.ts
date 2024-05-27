import { Type } from '@angular/core';
import { Button } from './Button.interface';

export interface Modal {
  type:string;
  title?: string;
  content?: string;
  icon?: string;
  ask?: string;
  clock?: string;
  error?: string;
  info?: string;
  ok?: string;
  buttons:Button[];
  //secondaryButton?: string;
  //outlineButton?: string;
}
