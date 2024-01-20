import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  authService = inject(AuthService);
  router = inject(Router);
  isError: boolean = false;

  login(event: Event) {
    event.preventDefault();
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.isError = true;
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('token', JSON.stringify(res.token));
          alert('Đăng nhập thành công');
          this.router.navigate(['/admin/products']);
        },
        error: (err) => {
          console.log(err);
          alert('Đăng nhập thất bại: ' + err.error.message);
        },
      });
    }
  }
}
