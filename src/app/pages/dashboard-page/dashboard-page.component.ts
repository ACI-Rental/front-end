import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  headers: Array<string> = ['Renter Email', 'From', 'To', 'Product', 'Location', 'Status', 'Requires approval', 'Actions'];
  data: Array<any> = [];

  constructor(private reservationServcie : ReservationService) { }

  ngOnInit(): void {
  }

  // getData() {
  //   this.reservationServcie.GetAllReservations().subscribe((response) => {
  //     this.data = response.map((reservation: any) => ({        
  //       renterMail: reservation?.id,
  //       location: reservation?.location,
  //       status: { value: "Available", align: 'center', tag: true, tagAvailable: true },
  //       requiresApproval: { value: reservation?.requiresApproval, align: 'center' },
  //       actions: [
  //       {
  //         icon: 'box-archive',
  //         function: () => this.cancelReservation(reservation?.id, !reservation?.archived),
  //         color: '#eb4d4b'
  //       }],
  //     }));
  //   });
  // }

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
