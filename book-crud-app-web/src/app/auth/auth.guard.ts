import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to the Login page if not authenticated
      return false;
    }
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  }
}