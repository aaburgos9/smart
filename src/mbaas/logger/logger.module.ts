import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerComponent } from './logger/logger.component';
import { LoggerItemComponent } from './logger-item/logger-item.component';

@NgModule({
  declarations: [LoggerComponent, LoggerItemComponent],
  exports: [LoggerComponent, LoggerItemComponent],
  imports: [CommonModule]
})
export class LoggerModule { }
