import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName = '';

  login() {
    this.userName = 'Assaad';
  }

  logout() {
    this.userName = '';
  }
}
