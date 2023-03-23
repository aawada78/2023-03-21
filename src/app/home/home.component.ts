import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private authService = inject(AuthService);

  get userName(): string {
    return this.authService.userName;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
