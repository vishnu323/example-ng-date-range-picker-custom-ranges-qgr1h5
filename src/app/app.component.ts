import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExampleHeaderComponent } from './example-header/example-header.component';
import { MatDateRangePicker } from '@angular/material/datepicker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // make ExampleHeaderComponent type available in our template:
  readonly ExampleHeaderComponent = ExampleHeaderComponent;
  @ViewChild('picker') datePicker: MatDateRangePicker<Date>;
  public handleDateRangeInputClick =() =>{
    this.datePicker.open();
    
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
