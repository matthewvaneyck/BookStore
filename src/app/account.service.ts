import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from './authentication.service';
import { CartComponent } from './cart-display/cart.component';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly url = 'https://localhost:44360/api/BookShops';
  constructor(private http: HttpClient, public modalDialog: MatDialog, private authService: AuthenticationService) {}

  showAccountCart(subscribedBooks: BookStore[]) {
    const dialogRef = this.modalDialog.open(CartComponent, {
      width: '800px',
      data: subscribedBooks
    });

    dialogRef.componentInstance.closePopup.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelPopup.subscribe(() => {
      dialogRef.close();
    });
    return dialogRef;
  }

  async getAllSubscribedBooks(): Promise<any> {
    let params = new HttpParams();
    params = params.append('email', this.authService.Email);
    return await this.http.get(this.url, {params}).toPromise();
  }
}

export interface BookStore {
  id: number;
  name: string;
  text: string;
  price: number;
  userEmail?: string;
}
