import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import * as moment from 'moment'

@Component({
  selector: 'app-packing-slip',
  templateUrl: './packing-slip.component.html',
  styleUrls: ['./packing-slip.component.scss']
})
export class PackingSlipComponent implements OnInit {

  reservations: any = []
  getPackingSlip() {
    console.log("s")
  }

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    console.log("s" )
    this.getData();
  }
  getData() {
    console.log("getting")
    this.reservationService.GetPackingSlip(moment().add(1, 'days').format('L')).subscribe((response) => {
        this.reservations = response;
    });;
  }

}
