import { Injectable, inject } from '@angular/core'; // inject
import { HttpClient } from '@angular/common/http'; // HttpClient
import { Product, ProductAdmin } from '../types/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // call api
  apiUrl = 'https://fakestoreapi.com/products'; // khai bao apiUrl
  apiAdminUrl = 'https://hoadv-nodejs.vercel.app/api/products'; // khai bao apiUrl
  http = inject(HttpClient); // inject bien http
  constructor() {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); //axios.get(apiUrl)
  }
  getProductListAdmin(): Observable<ProductAdmin[]> {
    return this.http.get<ProductAdmin[]>(this.apiAdminUrl); //axios.get(apiUrl)
  }
  getProductDetail(id: string): Observable<ProductAdmin> {
    return this.http.get<ProductAdmin>(`${this.apiAdminUrl}/${id}`);
  }
  deleteProductAdmin(id: string): Observable<ProductAdmin[]> {
    return this.http.delete<ProductAdmin[]>(`${this.apiAdminUrl}/${id}`);
  }
  addProductAdmin(product: ProductAdmin): Observable<ProductAdmin[]> {
    return this.http.post<ProductAdmin[]>(this.apiAdminUrl, product);
  }
  editProductAmdmin(
    id: string,
    product: ProductAdmin
  ): Observable<ProductAdmin> {
    return this.http.put<ProductAdmin>(`${this.apiAdminUrl}/${id}`, product);
  }
}
