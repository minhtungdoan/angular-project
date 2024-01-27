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
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UsersComponent } from './pages/admin/users/users.component';
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
      {
        path: 'users',
        component: UsersComponent,
      },
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
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'categories/edit-category/:id',
        component: UpdateCategoryComponent,
      },
    ],
  },
];
