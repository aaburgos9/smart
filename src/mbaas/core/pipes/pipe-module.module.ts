import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassSecurityTrustPipe } from './passSecurityTrust/pass-security-trust.pipe';
import { PointSeparatorPipe } from './pipeSeparator/point-separator.pipe';
import { AccountFormat } from './pipeAccount/account-format.pipe';
import { FilesPipe } from './filesPipe/files.pipe';

@NgModule({
  declarations: [
    PassSecurityTrustPipe,
    PointSeparatorPipe,
    AccountFormat,
    FilesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PassSecurityTrustPipe,
    PointSeparatorPipe,
    AccountFormat,
    FilesPipe
  ]
})
export class PipeModuleModule { }