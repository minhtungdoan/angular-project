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
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
    ]),
  });

  authService = inject(AuthService);
  router = inject(Router);
  isError: boolean = false;

  register(event: Event) {
    event.preventDefault();
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      this.isError = true;
      return;
    } else {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert('Đăng ký thành công');
          this.router.navigate(['/login-user']);
        },
        error: (err) => {
          console.log(err);
          alert('Đăng ký thất bại: ' + err.error.message);
        },
      });
    }
  }
}
