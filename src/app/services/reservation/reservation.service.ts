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
    return this.http.post(`${environment.BASE_URL}/reservation/reserveproduct`, data)
      .pipe(map((response: any) => {
        return response;
      }));

  }
}
