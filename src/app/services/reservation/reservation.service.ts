import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  ReserveProduct(data: any) {
    return this.http.post(`${environment.BASE_URL}/reservations/reserveproduct`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  
  GetAllReservations() {
    return this.http.get(`${environment.BASE_URL}/reservations`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  CancelReservation(data: any){
    return this.http.post(`${environment.BASE_URL}/reservations/action`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }
}
