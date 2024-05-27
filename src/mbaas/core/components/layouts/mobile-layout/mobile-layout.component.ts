import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mbass-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss']
})
export class MobileLayoutComponent implements OnInit {

  @Input() buttonFixed: boolean = false;
  @Input() buttonHead: boolean = false;
  @Input() buttonSmart: boolean = false;
  @Input() buttonContent: boolean = false;
  btnClass = "footer"
  ngOnInit(): void {
   if(this.buttonSmart=== true){
    this.btnClass= "footerSmart"
    }else if(this.buttonFixed=== true){
      this.btnClass= "footerSmart"

    }
   }
  
  
}
