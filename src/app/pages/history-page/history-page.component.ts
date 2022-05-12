import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  headers: Array<string> = ['From', 'To', 'Product', 'Status'];
  data: Array<any> = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.GetAllReservations().subscribe((response) => {
      this.data = response.map((reservation: any) => ({
        from: moment(reservation.startDate).format('LL'),
        to: moment(reservation.endDate).format('LL'),
        product: reservation.productId,
        status: this.getStatus(reservation.startDate, reservation.endDate),
        align: 'center',
      }));
    });
  }

  getStatus(startDate: any, endDate: any) {
    if (moment().isBetween(startDate, endDate, 'day')) {
      return 'Renting';
    }

    if (moment().isBefore(startDate, 'day')) {
      return 'Reserved';
    }

    if (moment().isBefore(endDate, 'day')) {
      return 'Returned';
    }

    return "";
  }
}
