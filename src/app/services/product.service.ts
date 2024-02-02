import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Laptop } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // call api
  api = 'https://angular-project-api.vercel.app/laptops';
  http = inject(HttpClient); // inject bien http
  constructor() {}

  getProductList(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.api); //axios.get(apiUrl)
  }
  getProductListAdmin(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(this.api); //axios.get(apiUrl)
  }
  getProductDetail(id: string): Observable<Laptop> {
    return this.http.get<Laptop>(`${this.api}/${id}`);
  }
  deleteProductAdmin(id: string): Observable<Laptop> {
    return this.http.delete<Laptop>(`${this.api}/${id}`);
  }
  addProductAdmin(product: Laptop): Observable<Laptop> {
    return this.http.post<Laptop>(this.api, product);
  }
  editProductAmdmin(id: string, product: Laptop): Observable<Laptop> {
    return this.http.put<Laptop>(`${this.api}/${id}`, product);
  }
  filterByCategory(category: string): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(
      `${this.api}/filterByCategories?query=${category}`
    );
  }
  searchProduct(query: string): Observable<Laptop[]> {
    return this.http.get<Laptop[]>(`${this.api}/search?search=${query}`);
  }
}
