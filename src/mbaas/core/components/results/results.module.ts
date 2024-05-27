import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResultsComponent } from "./results.component";

@NgModule({
    declarations: [
        ResultsComponent
    ],
    exports: [
        ResultsComponent
    ],
    imports: [
      CommonModule
    ]
  })
export class ResultsModule { }