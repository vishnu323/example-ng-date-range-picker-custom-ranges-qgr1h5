import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { GlobalValueService } from '../global-value.service';
const customPresets = [
  'Today',
  'Yesterday',
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  'Custom range'
] as const; // convert to readonly tuple of string literals

// equivalent to "today" | "last 7 days" | ... | "last year"
type CustomPreset = typeof customPresets[number];

@Component({
  selector: 'app-custom-range-panel',
  templateUrl: './custom-range-panel.component.html',
  styleUrls: ['./custom-range-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRangePanelComponent<D> {
  // list of range presets we want to provide:
  readonly customPresets = customPresets;
  @HostBinding('class.touch-ui')
  readonly isTouchUi = this.picker.touchUi;
  public todayVar: boolean = true;

  constructor(
    private dateAdapter: DateAdapter<D>,
    private picker: MatDateRangePicker<D>,
    private globalValueService: GlobalValueService
    
  ) {
    
    
  }


  detachToDate(state="block"){
    const seperator:any = document.querySelector('.mat-date-range-input-separator');
    const endRef:any = document.querySelector('.mat-date-range-input-end-wrapper');
    endRef.style.display=state;
    seperator.style.display=state;
  }
  updateGlobalValue(newValue: any) {
    this.globalValueService.setGlobalValue(newValue);
  }

  // Example of getting the global value
  getGlobalValue() {
    return this.globalValueService.getGlobalValue();
  }

  ngAfterViewInit() {
    if(this.getGlobalValue()){
      const ref:any = document.querySelector(`#${this.replaceSpacesWithHyphens(this.getGlobalValue())}`);
      ref.style.backgroundColor = "blue"
      // this.applyClassOrStyleOnce();
    }
  }
  // called when user selects a range preset:
  selectRange(rangeName: CustomPreset): void {
    const [start, end] = this.calculateDateRange(rangeName);
    this.picker.select(start);
    this.picker.select(end);
    if(start && end){
      this.picker.close();
    }
    
  }
 
  setBackGround = (id:string,type:string) =>{
    const ref:any = document.querySelector(`#${this.replaceSpacesWithHyphens(id)}`);
    if(ref){
      ref.style.backgroundColor=type;
    }
  }


  idSelector = (id:string) =>{
      this.setBackGround(id,"blue");
      this.updateGlobalValue(id);
  }

    replaceSpacesWithHyphens = (inputString:any) =>{
      return inputString.replace(/ /g, '-');
    }
  

  private calculateDateRange(rangeName: CustomPreset): [start: D, end: D] {
    const today = this.today;
    const year = this.dateAdapter.getYear(today);
    this.idSelector(rangeName);
    switch (rangeName) {
      case 'Today':
        this.detachToDate("none")
        return [today, today];
      case 'Yesterday': {
        this.detachToDate("none")
        const start = this.dateAdapter.addCalendarDays(today, -1);
        return [start, today];
      }
      case 'Last 7 days': {
        this.detachToDate()
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [start, today];
      }
      case 'Last 30 days':{
        this.detachToDate()
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -30);
        return [start, end];
      }
      case 'Last 90 days': {
        this.detachToDate()
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -90);
        return [start, end];
      }
      case 'Custom range':{
        this.detachToDate()
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -90);
        return [null, null];
      }
      default:
      console.log(" vishnu123556")
        // exhaustiveness check;
        // rangeName has type never, if every possible value is handled in the switch cases.
        // Otherwise, the following line will result in compiler error:
        // "Type 'string' is not assignable to type '[start: D, end: D]'"
        return rangeName;
    }
  }

  private get today(): D {
    const today = this.dateAdapter.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
}
