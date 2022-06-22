import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { getReservationStatusColor } from 'src/app/helpers/reservation.helpers';
import { ReservationAction } from 'src/app/models/reservation-action';
import { ReservationStatus } from 'src/app/models/reservation-status';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnChanges {
  @Input() userId: string = '';
  @Input() actions: boolean = false;
  @Input() preview: boolean = false;

  headers: Array<string> = ['Renter Email', 'From', 'To', 'Product', 'Location', 'Status'];;
  data: Array<any> = [];

  constructor(private reservationServcie: ReservationService) { }

  ngOnInit(): void {
    this.getData()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['preview']?.currentValue) {
      this.headers = ['From', 'To', 'Product', 'Status'];
    }
    else {
      this.headers = ['Renter Email', 'From', 'To', 'Product', 'Location', 'Status'];
    }
  }

  getData() {
    if (this.userId === "") {

      if (!this.preview) {
        this.headers = ['Renter Email', 'From', 'To', 'Product', 'Location', 'Status'];
      }

      this.reservationServcie.GetAllReservations().subscribe((response) => {
        this.formatData(response);
      });
    }
    else {
      this.reservationServcie.GetUserReservations(this.userId).subscribe((response) => {
        this.formatData(response);
      });
    }
  }

  formatData(data: any) {
    this.data = data.map((reservation: any) => {
      let extraVariables = {};

      if (this.userId === "") {
        extraVariables = {
          renterEmail: reservation?.renterEmail,
          location: reservation?.product?.location,
        }
      }

      return {
        from: moment(reservation.startDate).format('LL'),
        to: moment(reservation.endDate).format('LL'),
        product: reservation?.product?.name,
        status: { value: this.FormatEnumValue(ReservationStatus[reservation.status]), align: 'center', tag: true, color: getReservationStatusColor(reservation?.status) },
        actions: this.actions && !this.preview ? [
          {
            icon: 'pencil',
            function: () => this.editReservation(),
            color: '#f0932b'
          },
        ] : null,
        ...extraVariables
      }
    });
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
