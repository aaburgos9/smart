import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeadersComponent } from "./headers.component";

@NgModule({
    declarations: [
      HeadersComponent,
    ],
    exports: [
        HeadersComponent,
    ],
    imports: [
      CommonModule
    ]
  })
export class HeadersModule { }