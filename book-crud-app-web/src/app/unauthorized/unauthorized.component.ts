import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  requiredRole: string;

  constructor(private router: Router) {
    // Checks if the required role is activated 
    this.requiredRole = this.router.getCurrentNavigation()?.extras.state?.['requiredRole'] || 'admin';
  }
}