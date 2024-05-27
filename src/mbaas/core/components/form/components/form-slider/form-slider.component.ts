import { Component, OnInit, ViewChild } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'mbaas-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent implements Field, OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private formControl: FormControl;
  public range: any;
  public bubblePosition: any;
  public bubbleMargin: any;

  @ViewChild('bubble', { static: false }) bubble: any;
  @ViewChild('rangeElement', { static: false }) rangeElement: any;

  ngOnInit(): void {
    this.range = this.config.value ? this.config.value : 1;
    const formControlName = this.config.name;
    this.formControl = this.group.get(formControlName) as FormControl;
    this.formControl.setValue(this.config.value ? this.config.value : '');
    this.formControl.valueChanges.subscribe((value) => {
      this.range = value;
      setTimeout(() => {
        this.modifyOffset();
      }, 100 );
    });
  }

  modifyOffset() {
    const el = this.rangeElement;
    let newPlace = 0;
    const width = el.nativeElement.offsetWidth;
    const newPoint = (this.range - el.nativeElement.min) / (el.nativeElement.max - el.nativeElement.min);
    let offset = -2;
    if (newPoint <= 0) {
      offset = 1;
      newPlace = 0;
    } else if (newPoint >= 1) {
      newPlace = width - 30;
      offset = -1;
    } else {
      newPlace = width * newPoint + offset;
      offset -= newPoint;
    }
    this.bubble.nativeElement.style.left = newPlace + 'px';
    this.bubble.nativeElement.style.marginLeft = offset + '%';
  }

}
