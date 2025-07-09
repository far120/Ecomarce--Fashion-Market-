import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isTokenValid } from '../../environments/Token';

// General authentication guard for user routes
export const UserAuthGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/404']);
    return false;
  }
};

// Admin dashboard guard for admin routes
export const AdminDashboardGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Parse the token to get user information
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role; // Assuming the role is stored in the token payload
    
    // Check if user has admin privileges (owner or company)
    if (role === 'owner' || role === 'company' ) {
      return true; // Allow access for admin users
    } else {
      // Redirect to unauthorized page for non-admin users
    router.navigate(['/404'])
      return false;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    router.navigate(['/login']);
    return false;
  }
};

export const ownerDashboardGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Parse the token to get user information
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role; // Assuming the role is stored in the token payload
    
    // Check if user has admin privileges (owner or company)
    if (role === 'owner'  ) {
      return true; // Allow access for admin users
    } else {
      // Redirect to unauthorized page for non-admin users
    router.navigate(['/404'])
      return false;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    router.navigate(['/login']);
    return false;
  }
};
export const companyDashboardGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Parse the token to get user information
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role; // Assuming the role is stored in the token payload
    
    // Check if user has admin privileges (owner or company)
    if (role === 'company'  ) {
      return true; // Allow access for admin users
    } else {
      // Redirect to unauthorized page for non-admin users
    router.navigate(['/404'])
      return false;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    router.navigate(['/login']);
    return false;
  }
};

export const AuthGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    router.navigate(['/404']);
    return false;
    
  } else {
    return true;
  }
};


