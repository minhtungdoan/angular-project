import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { UpdateProductComponent } from './pages/admin/update-product/update-product.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginUserComponent } from './pages/auth/login-user/login-user.component';
import { RegisterUserComponent } from './pages/auth/register-user/register-user.component';
import { adminGuard } from './guards/admin.guard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-admin', component: LoginComponent },
  { path: 'login-user', component: LoginUserComponent },
  { path: 'register-user', component: RegisterUserComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      {
        path: '',
        component: ProductsComponent,
      },
      {
        path: 'products/add-product',
        component: AddProductComponent,
      },
      {
        path: 'products/edit-product/:id',
        component: UpdateProductComponent,
      },
    ],
  },
];
