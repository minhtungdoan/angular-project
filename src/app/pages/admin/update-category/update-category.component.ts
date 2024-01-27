import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../types/Category';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
  });

  categorySevice = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // }
  // constructor(private route: ActivatedRoute) {}

  isEditting: boolean = false;
  categoryId: string = '';
  loading: boolean = true;
  editCategory: Category = {
    _id: '',
    name: '',
    description: '',
  };
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.categoryId = param['id'];
      this.isEditting = !!this.categoryId;
      if (this.isEditting) {
        this.getEditCategory(this.categoryId);
      }
      // console.log(this.isEditting);
    });
  }

  getEditCategory(id: string) {
    this.categorySevice.getCategoryDetail(id).subscribe((product) => {
      console.log(123);
      this.editCategory = product;
      this.loading = false;
      // console.log(this.editCategory);
    });
  }
  handleUpdateCategory(e: Event): void {
    e.preventDefault();
    if (this.isEditting) {
      if (this.updateForm.invalid) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      this.categorySevice
        .editCategory(this.categoryId, this.updateForm.value)
        .subscribe(
          () => {
            alert('Sửa thành công');
            this.updateForm.reset();
            this.router.navigate(['/admin/categories']);
          },
          (error) => console.log(error)
        );
    }
  }
}
