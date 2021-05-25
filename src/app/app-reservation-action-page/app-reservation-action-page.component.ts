import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ProductData } from '../models/ProductData.model';
import { IReservationAction } from '../models/reservation-action.model';

@Component({
  selector: 'app-app-reservation-action-page',
  templateUrl: './app-reservation-action-page.component.html',
  styleUrls: ['./app-reservation-action-page.component.scss']
})
export class AppReservationActionPageComponent implements OnInit {

  products: Array<ProductData> = [];

  ngOnInit(): void {
  }
  /*
    Contains loading state.
    Disables all form inputs/buttons when true. Loading spinner is visible when true
  */
    isLoading = false;

    constructor(
        private translate: TranslateService,
        private snackbarService: MatSnackBar,
        private apiService: ApiService,
        private router: Router
      ) { }

      CancelReservation() {
        const reservationAction: IReservationAction = { reservationId: 0}
        //check ID
        if(true){
          this.apiService.cancelReservation(reservationAction).subscribe({
            next: (resp) => {
              this.isLoading = false;
              this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.SUCCESS'), undefined, {
                panelClass: 'success-snack',
                duration: 2500
              });
            },
            error: (err) => {
              this.isLoading = false;
              this.showErrorNotification(err.error);
            }
          });
        }
        else {
          this.snackbarService.open(this.translate.instant('RESERVATION.ACTION.UNSUCCESSFUL'), undefined, {
            panelClass: 'error-snack',
            duration: 2500
          });
        }
      }
  /*
    Show error notification

    @param translatableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
    private showErrorNotification(translatableMessage: string): void {
        this.snackbarService.open(this.translate.instant(translatableMessage), undefined, {
          panelClass: 'error-snack',
          duration: 2500
        });
    }
}
