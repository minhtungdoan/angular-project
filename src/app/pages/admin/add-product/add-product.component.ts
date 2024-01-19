import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CreateProductForm, ProductAdmin } from '../../../types/Product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
// import { Category } from 'path/to/category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  createForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    brand: new FormControl('', [Validators.required]),
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
