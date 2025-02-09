import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  _httpClient = inject(HttpClient);
  authService = inject(AuthService);

  baseUrl: string = '/api/v1/books';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  fetchAllBooks(): Observable<Book[]> {
    return this._httpClient.get<Book[]>(`${this.baseUrl}`, {
      headers: this.getHeaders(),
    });
  }

  createBook(data: Book): Observable<Book> {
    return this._httpClient.post<Book>(`${this.baseUrl}`, data, {
      headers: this.getHeaders(),
    });
  }

  updateBook(data: Book): Observable<Book> {
    return this._httpClient.put<Book>(`${this.baseUrl}/${data.bookId}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteBook(id: number): Observable<Book> {
    return this._httpClient.delete<Book>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}