import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent, User } from './sign-up/sign-up.component';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly AUTH_URL = 'https://localhost:44360/api/users';
  private _token!: string | null;
  private _email = '';
  
  set Token(token: string){
    this._token = token;
  }
  
  get Token(){
    return this._token!;
  }
  
    set Email(email: string){
    this._email = email;
  }
  
  get Email(){
    return this._email!;
  }
  constructor(private http: HttpClient, public modalDialog: MatDialog) {}

  showLoginForm() {
    const dialogRef = this.modalDialog.open(LoginComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.closePopup.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelPopup.subscribe(() => {
      dialogRef.close();
    });
    return dialogRef;
  }

  showRegisterForm() {
    const dialogRef = this.modalDialog.open(SignUpComponent, {
      width: '800px',
    });

    dialogRef.componentInstance.closePopup.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.componentInstance.cancelPopup.subscribe(() => {
      dialogRef.close();
    });
    return dialogRef;
  }

  async registerCustomer(userInfo: User): Promise<User | any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };

    return await this.http
      .post<User>(this.AUTH_URL, userInfo, httpOptions)
      .toPromise()
      .then((response) => {
        console.log(response);
        this.Token = response.token!;
        localStorage.setItem('token', this.Token)
        localStorage.setItem('email', userInfo.email)
      })
      .catch((e) => {
        console.log('error', e);
      });
  }

  async signUserIn(email: string, password: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return await this.http
      .get(this.AUTH_URL, { params: params })
      .toPromise()
  }
}
