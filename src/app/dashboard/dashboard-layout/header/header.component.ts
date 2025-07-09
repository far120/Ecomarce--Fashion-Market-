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
          this.Role = payload.role; 
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
  UserManagement() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/users']);
    }
  }
  
  ProductManagementowner(){
     if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/productmanegmentowner']);
    }
  }
  ProductManagementadmin(){
     if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/productmanegmentadmin']);
    }
  }

  CategoryBrand() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/categorybrand']);
    }
  }
  CategoryBrandOwner() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/categorybrandowner']);
    }
  }
  
  onNotifications() {
    console.log('Notifications clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/notfication']);
    }
  }
  onWishlist() {
    console.log('Wishlist clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/wishlist']);
    }
  }
  onCart() {
    console.log('Cart clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/cart']);
    } 
  }

  logsManagementt() {
    console.log('Logs Management clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/logs']);
    }
  }

  openviewManagement(){
    console.log('Openview Management clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/openviewowner']);
    }
  }
  OrderManagement(){
    console.log('Order Management clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/orderowner']);
    }
  }
  CompanyManagement(){
    console.log('Company Management clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/company']);
    }
  }

  Createuser(){
    console.log('Create User clicked');
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard/register']);
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.userName = '';
    this.Role = '';
    this.router.navigate(['/home']);
  }
}
