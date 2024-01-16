import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductAdmin } from '../../../types/Product';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService);

  productList: ProductAdmin[] = [];

  ngOnInit(): void {
    this.productService
      .getProductListAdmin()
      .subscribe((res: ProductAdmin[]) => (this.productList = res));
  }

  deleteProduct(id: string, event: Event): void {
    event.preventDefault();
    console.log(id);
    const cf = confirm('Bạn có chắc chắn muốn xóa không?');
    if (cf) {
      this.productService.deleteProductAdmin(id).subscribe((res) => {
        alert('Xóa thành công');
        this.productList = this.productList.filter((item) => item._id !== id);
      });
    } else {
      return;
    }
  }

  // router = inject(Router);
}
