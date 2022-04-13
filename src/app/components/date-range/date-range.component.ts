import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  moment: any = moment;
  startDate: any = null;
  endDate: any = null;
  days: any = [];

  constructor() { }

  ngOnInit(): void {
    this.renderCalendarDays();
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

    this.startDate = startDate;
    this.endDate = endDate;

    console.log(startDate, endDate)
  }
}
