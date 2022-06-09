import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ReservationAction } from 'src/app/models/reservation-action';
import { ReservationStatus } from 'src/app/models/reservation-status';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
        status: { value: this.FormatEnumValue(ReservationStatus[reservation.status]), align: 'center', tag: true, color: this.getReservationStatusColor(reservation?.status), tagAvailable: true },
        actions: [
          {
            icon: 'pencil',
            function: () => this.editReservation(),
            color: '#f0932b'
          },
        ]
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

  editReservation() {

  }

  editReservationStatus(reservationId: any, reservationAction: ReservationAction) {
    this.reservationServcie.EditReservationStatus({ reservationId, reservationAction }).subscribe(response => {
      if (!response.error) {
        this.getData();
        this.Notify('success', 'Reservation updated!')
      }
    },
      (err) => {
        this.Notify('error', err.error.message || 'Something went wrong.')
      })
  }

  Notify(status: SweetAlertIcon, message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: message,
      icon: status,
    });
  }

  FormatEnumValue(value: any) {
    return value.toString().charAt(0).toUpperCase() + value.toString().slice(1).toLowerCase()
  }
}
