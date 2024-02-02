import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Homeppage';
  menuList = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'About Us',
      link: '/',
    },
    {
      label: 'Shop',
      link: '/',
    },
    {
      label: 'Contact',
      link: '/',
    },
  ]; // NgFor
}
