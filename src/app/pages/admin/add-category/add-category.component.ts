import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ]),
  });

  categoryService = inject(CategoryService);
  router = inject(Router);

  handleAddProduct(e: Event): void {
    e.preventDefault();

    if (this.createForm.invalid) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    console.log(this.createForm.value);
    this.categoryService.createCategory(this.createForm.value).subscribe(
      () => {
        alert('Thêm thành công');
        this.createForm.reset();
        this.router.navigate(['/admin/categories']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
