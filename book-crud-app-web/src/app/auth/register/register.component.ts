import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  role: string = 'user'; // Default role
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' | 'info' = 'warning';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('user', Validators.required),
  });

  register() {
    if (this.form.valid) {
      const registerData = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        role: this.form.controls.role.value,
      };
      console.log('registerData>>', registerData);

      this.http.post<{ token: string }>('http://localhost:3000/api/auth/register', registerData).subscribe({
        next: (response) => {
          // Pass both token and role to the login method
          this.role = this.form.controls.role.value ? this.form.controls.role.value : 'user';
          this.authService.login(response.token, this.role);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          if (err.status === 409) {
            // User already exists
            this.alertMessage = 'The user already exists. Please try a different email.';
            this.alertType = 'warning';
          } else {
            // Other errors
            this.alertMessage = 'Registration failed. Please try again.';
            this.alertType = 'danger';
          }
        },
      });
    } else {
      this.alertMessage = 'Please fill out all fields correctly.';
      this.alertType = 'danger';
    }
  }
}