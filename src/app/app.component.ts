import { Component,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExampleHeaderComponent } from './example-header/example-header.component';
import { MatDateRangePicker ,MatDatepickerInputEvent} from '@angular/material/datepicker';

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
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  public getDateFormat = (dateString:string) =>{
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  }

  public parseRange = () =>{
    const start = this.getDateFormat(this.range.value.start);
    const end = this.getDateFormat(this.range.value.end);

    const object = {
      "start" : start,
      "end" : end
    }
    
    return object;
  }

  calendarHandler(event: MatDatepickerInputEvent<Date>) {
    const { value, target } = event;
    console.log("target",target)
  }

   
}
