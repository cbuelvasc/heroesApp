import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  signin(): void {
    this.authService.signin().subscribe((resp) => {
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }
      console.log(resp);
    });
  }

  signInWithLogin() {
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }
}
