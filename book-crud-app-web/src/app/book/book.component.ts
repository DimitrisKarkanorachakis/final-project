import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Book } from '../shared/interfaces/book';
import { BookService } from '../shared/services/book.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements AfterViewInit {
  displayedColumns: string[] = ['bookId', 'title', 'author', 'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Book>();
  isAdmin: boolean = false; 

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private snackBar: MatSnackBar 
  ) {}

  book: Book = {
    bookId: 0,
    title: '',
    author: '',
    price: 0,
  };

  books: Book[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.fetchBooks();
    this.checkUserRole(); // Check the user's role 
  }

  // Fetch all books
  fetchBooks() {
    this.bookService.fetchAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.dataSource = new MatTableDataSource<Book>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Failed to fetch books', err);
      },
    });
  }

  // Check if the user is an admin
  checkUserRole() {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'admin'; 
  }

  // Search for books
  searchBook(input: string) {
    this.dataSource.filter = input.trim().toLowerCase();
  }

  // Add or update a book
  addOrUpdateBook(book: Book) {
    if (this.isAdmin) { // Only allow admin to add or update books
      if (book.bookId !== 0) {
        this.bookService.updateBook(book).subscribe({
          next: (data) => {
            this.snackBar.open('Book updated', 'Close', { duration: 3000 });
            this.fetchBooks();
            this.clearForm();
          },
        });
      } else {
        this.bookService.createBook(book).subscribe({
          next: (data) => {
            this.snackBar.open('New book inserted', 'Close', { duration: 3000 });
            this.fetchBooks();
            this.clearForm();
          },
        });
      }
    } else {
      this.snackBar.open('You do not have permission to perform this action.', 'Close', { duration: 3000 });
    }
  }

  private showPermissionError(action: string) {
    this.snackBar.open(`You do not have permission to ${action}.`, 'Close', { duration: 3000 });
  }

  // Populate form fields for editing
  populateFormFields(book: Book) {
    if (this.isAdmin) { // Only allow admin to edit books
      this.book = { ...book };
    } else {
      this.showPermissionError('edit books');
    }
  }

  // Delete a book
  deleteBook(id: number) {
    if (this.isAdmin) { // Only allow admin to delete books
      const isConfirmed = confirm('Are you sure you want to delete this book?');
      if (isConfirmed) {
        this.bookService.deleteBook(id).subscribe({
          next: (data) => {
            this.books = this.books.filter((item) => item.bookId !== id);
            this.dataSource = new MatTableDataSource<Book>(this.books);
            this.snackBar.open('Book deleted', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Failed to delete book', err);
            this.snackBar.open('Failed to delete book', 'Close', { duration: 3000 });
          },
        });
      }
    } else {
      this.showPermissionError('delete books');
    }
  }

  // Clear the form
  clearForm() {
    this.book = {
      bookId: 0,
      title: '',
      author: '',
      price: 0,
    };
  }
}