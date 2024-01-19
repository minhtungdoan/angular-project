import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import {
  CreateProductForm,
  Laptop,
  ProductAdmin,
} from '../../../types/Product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
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
    // rate: new FormControl('', [Validators.required]),
  });

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // }
  // constructor(private route: ActivatedRoute) {}

  isEditting: boolean = false;
  productId: string = '';
  loading: boolean = true;
  editProduct: Laptop = {
    _id: '',
    name: '',
    brand: '',
    image: '',
    price: 0,
    description: '',
  };
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param['id']);
      this.productId = param['id'];
      this.isEditting = !!this.productId;
      if (this.isEditting) {
        this.getEditProduct(this.productId);
      }
      console.log(this.isEditting);
    });
  }

  getEditProduct(id: string) {
    this.productService.getProductDetail(id).subscribe((product) => {
      console.log(123);
      this.editProduct = product;
      this.loading = false;
      console.log(this.editProduct);
    });
  }
  handleAddProduct(e: Event): void {
    e.preventDefault();
    if (this.isEditting) {
      if (this.createForm.invalid) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      this.productService
        .editProductAmdmin(this.productId, this.createForm.value)
        .subscribe(
          () => {
            alert('Sửa thành công');
            this.createForm.reset();
            this.router.navigate(['/admin/products']);
          },
          (error) => console.log(error)
        );
    }
  }
}
