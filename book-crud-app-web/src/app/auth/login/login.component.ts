import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'user';
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  login() {
    if (this.email && this.password) {
      const loginData = { email: this.email, password: this.password };
      this.http.post<{ token: string, user: any }>('/api/auth/login', loginData).subscribe({
        next: (response) => {
          console.log("1>>",response)    
          this.authService.login(response.token, response.user.role);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      this.snackBar.open('Please enter email and password', 'Close', {
        duration: 3000,
      });
    }
  }
}