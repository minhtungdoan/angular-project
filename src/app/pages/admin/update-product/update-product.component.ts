import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Laptop } from '../../../types/Product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../types/Category';
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
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
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000),
    ]),
    // rate: new FormControl('', [Validators.required]),
  });

  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];

  // }
  // constructor(private route: ActivatedRoute) {}

  isEditting: boolean = false;
  productId: string = '';
  loading: boolean = true;
  editProduct: Laptop = {
    _id: '',
    name: '',
    category: {
      _id: '',
      name: '',
      description: '',
    },
    image: '',
    price: 0,
    description: '',
  };
  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe((res) => {
      this.categoryList = res;
    });
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.isEditting = !!this.productId;
      if (this.isEditting) {
        this.getEditProduct(this.productId);
      }
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
  handleUpdateProduct(e: Event): void {
    e.preventDefault();
    console.log(this.editProduct.category._id);
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
