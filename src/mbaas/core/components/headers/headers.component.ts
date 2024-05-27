import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mbaas-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  @Input() image = '';
  @Input() menuLateral =[];
  @Input() menuSuperior =[];

  isExpanded: boolean = true;
  expandedClass = 'Expandable--false';


  constructor() { }

  ngOnInit(): void {
    console.log('menuSuperior', this.menuSuperior)
  }

  openAndCloseNav(){
    if (this.isExpanded){
      console.log('HeadersComponent entro',this.isExpanded)
      this.isExpanded= false
      return  this.expandedClass = 'Expandable';
    }else{
      console.log('HeadersComponent no entro',this.isExpanded)
      this.isExpanded= true
      return this.expandedClass = 'Expandable--false';
    }

  }

}
