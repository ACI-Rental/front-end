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
  
  GetPersonalReservations() {
    return this.http.get(`${environment.BASE_URL}/reservations/history`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  GetUserReservations(userId: string) {
    return this.http.get(`${environment.BASE_URL}/reservations/history/${userId}`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  EditReservationStatus(data: any){
    return this.http.post(`${environment.BASE_URL}/reservations/action`, data)
    .pipe(map((response: any) => {
      return response;
    }));
  }
}
