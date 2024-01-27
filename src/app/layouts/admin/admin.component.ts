import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  // productService = inject(ProductService);
  // productList: Product[] = [];
  // ngOnInit(): void {
  //   this.productService
  //     .getProductList()
  //     .subscribe((res) => (this.productList = res));
  // }
}
