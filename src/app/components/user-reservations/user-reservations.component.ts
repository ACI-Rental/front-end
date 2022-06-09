import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ReservationStatus } from 'src/app/models/reservation-status';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {
  headers: Array<string> = ['Renter Email', 'From', 'To', 'Product', 'Location', 'Status'];
  data: Array<any> = [];

  constructor(private reservationServcie: ReservationService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.reservationServcie.GetAllReservations().subscribe((response) => {
      console.log(response)
      this.data = response.map((reservation: any) => ({
        renterEmail: reservation?.renterEmail,
        from: moment(reservation.startDate).format('LL'),
        to: moment(reservation.endDate).format('LL'),
        product: reservation?.product?.name,
        location: reservation?.product?.location,
        status: { value: ReservationStatus[reservation.status].charAt(0).toUpperCase() + ReservationStatus[reservation.status].slice(1).toLowerCase(), align: 'center', tag: true, color: this.getReservationStatusColor(reservation?.status), tagAvailable: true },
      }));
    });
  }

  getReservationStatusColor(status: ReservationStatus) {
    switch (status) {
      case ReservationStatus.ACTIVE:
        return [32, 87]

      case ReservationStatus.RESERVED:
        return [238, 66]

      case ReservationStatus.RETURNED:
        return [102, 40]

      default:
        return null;
    }
  }

  // cancelReservation(id: any, archived: boolean) {
  //   this.reservationServcie.({ id, archived }).subscribe(response => {
  //     if (!response.error) {
  //       this.getData();
  //       this.Notify('success', 'Reservation canceld!')
  //     }
  //   },
  //     (err) => {
  //       this.Notify('error', err.error.message || 'Something went wrong.')
  //     })
  // }
}
