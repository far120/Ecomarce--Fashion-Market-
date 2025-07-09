import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);

  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/404']);
    return false;
  }
};
