import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { isTokenValid } from '../../../../environments/Token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  Role: string = '';
  isMobileMenuOpen: boolean = false;

  constructor(private router: Router) {
    
  }

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLoggedIn = isTokenValid();
    if (this.isLoggedIn) {
      // Get user info from token or localStorage
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.userName = payload.email;
          this.Role = payload.role; // Assuming the role is stored in the token payload
        } catch (e) {
          this.userName = 'User';
        }
      }

    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  GotoProfile() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  onNotifications() {
    if (this.isLoggedIn) {
      this.router.navigate(['/notfication']);
    }
  }
  onWishlist() {
    if (this.isLoggedIn) {
      this.router.navigate(['/wishlist']);
    }
  }
  onCart() {
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']);
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.userName = '';
    this.Role = '';
    this.router.navigate(['/']);
  }
}
