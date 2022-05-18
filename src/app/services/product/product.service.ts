import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  BASE_URL = `${environment.BASE_URL}/products`

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(this.BASE_URL)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getProduct(id: any) {
    return this.http.get(`${this.BASE_URL}/${id}`)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  createProduct(data: any) {
    return this.http.post(this.BASE_URL, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  editProduct(data: any) {
    return this.http.put(`${this.BASE_URL}/edit`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  archiveProduct(data: any) {
    return this.http.put(`${this.BASE_URL}/archive`, data)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
