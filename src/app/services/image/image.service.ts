import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  BASE_URL = `${environment.BASE_URL}/Image`
  constructor(private http: HttpClient) {}

  postImage(data: any) {
    return this.http.post(`${environment.BASE_URL}/image`, data)
      .pipe(map((response: any) => {
        return response;
      }));

  }
}
