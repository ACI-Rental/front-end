import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${environment.BASE_URL}/category`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createCategory(data: any) {
    return this.http.post(`${environment.BASE_URL}/category`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
