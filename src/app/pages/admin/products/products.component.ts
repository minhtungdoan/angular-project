import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Laptop } from '../../../types/Product';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../../types/Category';
import { CategoryService } from '../../../services/category/category.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  loading: boolean = true;

  productList: Laptop[] = [];
  categoryList: Category[] = [];

  searchResult: Laptop[] = [];
  autocompleteSearchList: Laptop[] = [];
  searchValueToAutocomplete: string = '';

  isDropdownVisible = false;
  filterCategory: string[] = [];
  isFilteringOrSearching: boolean = false;

  loadingCategory: boolean = true;

  maxProductPerPage: number = 6;
  p: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this.getProducts();
    this.getCategoryList();
  }

  getProducts(): void {
    this.isFilteringOrSearching = false;
    this.productService.getProductListAdmin().subscribe((res: Laptop[]) => {
      this.productList = res;
      this.loading = false;
    });
  }

  deleteProduct(id: string, event: Event): void {
    event.preventDefault();
    console.log(this.productList);
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

  // Filter by category
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  filterProducts(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.isFilteringOrSearching = true;

    if (target.checked) {
      this.filterCategory.push(value);
    } else {
      const index = this.filterCategory.indexOf(value);
      if (index !== -1) {
        this.filterCategory.splice(index, 1);
      }
    }
    // this.filterCategory.push((event.target as HTMLInputElement).value);
    // console.log(this.filterCategory);
    if (this.filterCategory.length === 0 && this.searchResult.length === 0) {
      this.loading = true;
      this.getProducts();
    } else if (
      this.filterCategory.length === 0 &&
      this.searchResult.length > 0
    ) {
      this.loading = true;
      this.productList = this.searchResult;
      this.loading = false;
    } else if (this.searchResult.length > 0) {
      this.loading = true;
      this.productList = this.searchResult.filter((product) =>
        this.filterCategory.includes(product.category._id)
      );
      this.loading = false;
    } else {
      this.loading = true;
      this.productService
        .filterByCategory(this.filterCategory.join(','))
        .subscribe((res: Laptop[]) => {
          this.productList = res;
          this.loading = false;
        });
    }

    // if (this.productList.length <= this.maxProductPerPage * (this.p - 1)) {
    //   this.p = 1;
    // }
    if (
      this.p > 1 &&
      this.productList.length / this.maxProductPerPage <= this.p - 1
    ) {
      this.p = 1;
    }
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe((res: Category[]) => {
      this.categoryList = res;
      this.loadingCategory = false;
    });
  }

  // Search product
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  onSearch(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.isFilteringOrSearching = true;
    this.autocompleteSearchList = [];

    if (this.searchForm.value.searchValue) {
      this.productList = [];
      this.productService
        .searchProduct(this.searchForm.value.searchValue)
        .subscribe((res: Laptop[]) => {
          this.productList = res;
          this.searchResult = res;
          this.loading = false;
        });
    } else {
      this.searchResult = [];
      this.getProducts();
    }
  }
  onCompleteClick(textSearch: string) {
    this.loading = true;
    this.isFilteringOrSearching = true;
    this.autocompleteSearchList = [];

    if (textSearch) {
      this.searchValueToAutocomplete = textSearch;
      this.productList = [];
      this.productService
        .searchProduct(textSearch)
        .subscribe((res: Laptop[]) => {
          // this.searchForm.value.searchValue = textSearch;
          this.productList = res;
          this.searchResult = res;
          this.loading = false;
        });
    }
  }

  // Autocomplete Search
  autocompleteSearch(value: Event) {
    if (this.searchValueToAutocomplete) {
      this.productService
        .searchProduct(this.searchValueToAutocomplete)
        .subscribe((res: Laptop[]) => {
          this.autocompleteSearchList = res;
          if (!this.searchValueToAutocomplete) {
            this.autocompleteSearchList = [];
          }
        });
      console.log(this.searchValueToAutocomplete);
      console.log(this.autocompleteSearchList);
    } else {
      this.autocompleteSearchList = [];
    }
  }

  // Pagination
  pageChangeEvent(event: number) {
    this.p = event;
    if (!this.isFilteringOrSearching) {
      this.getProducts();
    }
  }
}
