import { Component, NgModule, inject } from '@angular/core'; // khai bao inject
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service'; // import services
import { Laptop } from '../../types/Product';
import { CustomSlicePipe } from '../../pipes/custom-slice.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService); // inject vao bien

  productList: Laptop[] = [];

  isDropdownVisible = false;
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  ngOnInit(): void {
    this.productService
      .getProductList()
      .subscribe((products) => (this.productList = products.slice(0, 9))); // callApi.then(cb fuc)
  }
  //contruct
}
