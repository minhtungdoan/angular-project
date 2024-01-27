import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../../types/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  api = 'https://angular-project-api.vercel.app/categories';
  http = inject(HttpClient); // inject bien http

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }
  getCategoryDetail(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.api}/${id}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.api, category);
  }
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${this.api}/${id}`);
  }
  editCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, category);
  }
}
