import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/Product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService);

  productList: Product[] = [];

  ngOnInit(): void {
    this.productService
      .getProductList()
      .subscribe((res) => (this.productList = res));
  }
}
