import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeaderEnterpriseComponent } from "./header-enterprise.component";

@NgModule({
    declarations: [
      HeaderEnterpriseComponent
    ],
    exports: [
        HeaderEnterpriseComponent
    ],
    imports: [
      CommonModule
    ]
  })
export class HeaderEnterpriseModule { }