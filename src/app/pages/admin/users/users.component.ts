import { Component, inject } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../types/Auth';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    NgIf,
    DatePipe,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userService = inject(AuthService);
  loading: boolean = true;
  userList: User[] = [];

  p: number = 1;
  total: number = 0;
  isSearch: boolean = false;

  ngOnInit(): void {
    this.getUsers();
  }

  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  onSearch(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.isSearch = true;

    if (this.searchForm.value.searchValue) {
      this.userList = [];
      this.userService
        .searchUser(this.searchForm.value.searchValue)
        .subscribe((res: User[]) => {
          this.userList = res;
          this.loading = false;
        });
    } else {
      this.getUsers();
    }
  }

  getUsers(): void {
    this.isSearch = false;
    this.userService.getUserList().subscribe((res: User[]) => {
      this.userList = res;
      this.loading = false;
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    if (!this.isSearch) {
      this.getUsers();
    }
  }
}
