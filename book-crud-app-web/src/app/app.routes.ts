import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';
import { AdminComponent } from './admin/admin.component';
 
export const routes: Routes = [
  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, roleGuard], data: { roles: ['admin'] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];