import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalValueService {
  private globalValue: string= "Today";

  constructor() { }
  getGlobalValue() {
    return this.globalValue;
  }
  
  setGlobalValue(value: any) {
    this.globalValue = value;
  }
}
