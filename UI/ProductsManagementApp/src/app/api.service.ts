import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = "https://localhost:7261/api/Products";

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiURL);
  }

  getProductsByid(productId: number): Observable<Product> {
    return this._http.get<Product>(`${this.apiURL}/${productId}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiURL}/${id}`);
  }

  postProduct(data: Product): Observable<Product> {
    return this._http.post<Product>(this.apiURL, data);
  }

  putProduct(productId: number, data: Product): Observable<Product> {
    return this._http.put<Product>(`${this.apiURL}/${productId}`, data);
  }
}
