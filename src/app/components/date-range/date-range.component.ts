import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  private _date = moment();

  set date(value: any) {
    this.renderCalendarDays(value)
    this._date = value;
  }

  get date() {
    return this._date;
  }

  startDate: any;
  endDate: any;

  startDateSub: Subscription = Subscription.EMPTY;
  endDateSub: Subscription = Subscription.EMPTY;

  moment: any = moment;
  days: any = [];

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.startDateSub = this.sharedService.startDate.subscribe(startDate => this.startDate = startDate)
    this.endDateSub = this.sharedService.endDate.subscribe(endDate => this.endDate = endDate)

    this.renderCalendarDays();
  }

  ngOnDestroy(): void {
    this.startDateSub.unsubscribe();
    this.endDateSub.unsubscribe();
  }

  renderCalendarDays(date = null) {
    this.days = [];

    const currentDate = date || this.date;

    const thisDate = moment(currentDate)
    const daysInMonth = moment(currentDate).daysInMonth();
    const firstDayDate = moment(currentDate).startOf('month');
    const previousMonth = moment(currentDate).subtract(1, 'month');
    const previousMonthDays = previousMonth.daysInMonth();
    const nextMonth = moment(currentDate).add(1, 'month');

    for (let i = firstDayDate.day(); i > 1; i--) {
      previousMonth.date(previousMonthDays - i + 2);

      this.days.push({ currentDate, date: moment(previousMonth) })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      thisDate.date(i);

      this.days.push({ currentDate, date: moment(thisDate) });
    }

    const daysCount = this.days.length;
    for (let i = 1; i <= (35 - daysCount); i++) {
      nextMonth.date(i);

      this.days.push({ currentDate, date: moment(nextMonth) });
    }
  }

  resetDate() {
    this.date = moment();
  }

  changeMonth(month: any) {
    const date = this.date;

    date.month(month);

    this.date = date
  }

  changeDate(date: any) {
    let startDate = this.startDate;
    let endDate = this.endDate;

    if (startDate === null || date.isBefore(startDate, 'day') || !startDate.isSame(endDate, 'day')) {
      startDate = moment(date);
      endDate = moment(date);
    } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
      startDate = null;
      endDate = null;
    } else if (date.isAfter(startDate, 'day')) {
      endDate = moment(date);
    }

    this.sharedService.updateStartDate(startDate);
    this.sharedService.updateEndDate(endDate);
  }
}
