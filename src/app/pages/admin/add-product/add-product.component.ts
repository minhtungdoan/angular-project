import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../types/Category';
// import { Category } from 'path/to/category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
  });

  productService = inject(ProductService);
  router = inject(Router);
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((res: Category[]) => {
      this.categoryList = res;
    });
  }

  handleAddProduct(e: Event): void {
    e.preventDefault();

    if (this.createForm.invalid) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    console.log(this.createForm.value);
    this.productService.addProductAdmin(this.createForm.value).subscribe(
      () => {
        alert('Thêm thành công');
        this.createForm.reset();
        this.router.navigate(['/admin/products']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
