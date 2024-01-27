import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../types/Category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryService = inject(CategoryService);
  loading: boolean = true;

  categoryList: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((res: Category[]) => {
      this.categoryList = res;
      this.loading = false;
    });
  }

  deleteCategory(id: string, event: Event): void {
    event.preventDefault();
    console.log(id);
    const cf = confirm('Bạn có chắc chắn muốn xóa không?');
    if (cf) {
      this.categoryService.deleteCategory(id).subscribe((res) => {
        alert('Xóa thành công');
        this.categoryList = this.categoryList.filter((item) => item._id !== id);
      });
    } else {
      return;
    }
  }
}
