import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          alert('Đăng nhập thất bại: ' + err.error.message);
        },
      });
    }
  }
}
