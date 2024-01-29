import { Component, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../types/Auth';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, DatePipe, NgxPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userService = inject(AuthService);
  loading: boolean = true;
  userList: User[] = [];

  p: number = 1;
  total: number = 0;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUserList().subscribe((res: User[]) => {
      this.userList = res;
      this.loading = false;
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getUsers();
  }
}
