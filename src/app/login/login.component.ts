import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  @Output() closePopup = new EventEmitter();
  @Output() cancelPopup = new EventEmitter();
  errorMessage: any;
  isLoading = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  cancelPopupEventHandler() {
    this.closePopup.emit();
  }

  closePopupEventHandler() {
    this.closePopup.emit();
  }

  async signInDirect() {
    this.isLoading = true;
    await this.authService
      .signUserIn(this.email, this.password)
      .then((response) => {
        console.log('logged in successful:', response);
        this.errorMessage = '';
        this.closePopupEventHandler();
      })
      .catch((ex) => {
        if (ex.status === 401) {
          this.errorMessage = ex.error;
        }
      });
      this.isLoading = false;
  }
}
