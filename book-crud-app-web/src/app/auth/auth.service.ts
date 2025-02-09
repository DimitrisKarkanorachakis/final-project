import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string = '';

  login(token: string, role: string) {
    console.log(token,role)
    this.isLoggedIn = true;
    this.userRole = role;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  logout() {
    this.isLoggedIn = false;
    this.userRole = '';
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserRole(): string {
    return this.userRole || localStorage.getItem('role') || '';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000; // Check if token is expired
    }
    return true;
  }
}