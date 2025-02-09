import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decoded: any = jwtDecode(token);
  const userRole = decoded.role;
  const requiredRoles = route.data['roles'] as Array<string>;

  if (requiredRoles.includes(userRole)) {
    return true;
  } else {
    // Mentions the required role to access the page
    router.navigate(['/unauthorized'], { state: { requiredRole: requiredRoles.join(', ') } });
    return false;
  }
};