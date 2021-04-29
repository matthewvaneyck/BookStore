import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { AccountService, BookStore } from './account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const BookStoreData: BookStore[] = [
  {
    id: 1,
    name: 'Shakespeare and Company, Paris',
    text:
      'Shakespeare and Company is often described as the most famous bookstore in the world—but which one is the most famous? ',
    price: 160,
  },
  { id: 2, name: 'The Strand, New York City', text: 'The Strand, New York City and Company is often described as the most famous bookstore in the world—but which one is the most famous? ', price: 260 },
  { id: 3, name: 'City Lights Books, San Francisco', text: 'City Lights Books and Company is often described as the most famous bookstore in the world—but which one is the most famous? ', price: 360 },
  {
    id: 4,
    name: 'El Ateneo Grand Splendid, Buenos Aires',
    text: 'El Ateneo Grand Splendid and Company is often described as the most famous bookstore in the world—but which one is the most famous? ',
    price: 460,
  },
  { id: 5, name: 'Libreria Acqua Alta, Venice', text: 'Libreria Acqua Alta and Company is often described as the most famous bookstore in the world—but which one is the most famous? ', price: 560 },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-shop';
  bookName = '';
  bookPrice: number | undefined;
  dataSource = BookStoreData;
  selectedBooks: BookStore[] = [];

  isLoggedIn = false;
  readonly url = 'https://localhost:44360/api/BookShops';

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.Token = token;
      this.selectedBooks = await this.accountService.getAllSubscribedBooks();
    }
  }

  isUserLoggedIn() {
    return localStorage.getItem('token')?.toString() &&
      this.authService.Token !== null
      ? true
      : false;
  }

  async AddItem(bookItem: BookStore) {
    const duplicateSubscription = this.selectedBooks.find(
      (book) => book.id === bookItem.id
    );
    if (duplicateSubscription) {
      const snackBarRef = this.snackBar.open(
        `Oops... You have already subscribed to  ${bookItem.name}`
      );
      setTimeout(snackBarRef.dismiss.bind(snackBarRef), 5000);
      return;
    }
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      this.authService.Token = token;
      this.authService.Email = email!;
      this.selectedBooks?.push({ ...bookItem });
      
      bookItem.userEmail = email!;

      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
      };

      await this.http
        .post<BookStore>(this.url, bookItem, httpOptions)
        .toPromise()
        .then((response) => {
          console.log('response', response);
        })
        .catch((e) => {
          console.log('error', e);
        });
    } else {
      this.authService.showLoginForm();
    }
  }

  Register() {
    this.authService.showRegisterForm();
  }

  Login() {
    this.authService.showLoginForm();
  }

  Logout() {
    this.authService.Token = null!;
    this.selectedBooks = [];
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  viewSubscribedBooks() {
    this.accountService.showAccountCart(this.selectedBooks);
  }
}


