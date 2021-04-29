import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  @Output() closePopup = new EventEmitter();
  @Output() cancelPopup = new EventEmitter();
  passwordInvalid = false;
  isLoading = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  cancelPopupEventHandler() {
    this.closePopup.emit();
  }

  closePopupEventHandler() {
    this.closePopup.emit();
  }

  checkPassword() {
    this.passwordInvalid = false;
    if (
      this.password !== this.confirmPassword ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.passwordInvalid = true;
    }
  }
  
  async register(){
    this.isLoading = true;
    const user = {firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password} as User;
    await this.authService.registerCustomer(user);
    this.closePopupEventHandler();
    this.isLoading = false;
  }
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
}
