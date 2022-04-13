import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  private _startDateSource = new BehaviorSubject<any>(null);
  private _endDateSource = new BehaviorSubject<any>(null);
  startDate = this._startDateSource.asObservable();
  endDate = this._endDateSource.asObservable();

  updateStartDate(value: any) {
    this._startDateSource.next(value);
  }

  updateEndDate(value: any) {
    this._endDateSource.next(value);
  }
}
