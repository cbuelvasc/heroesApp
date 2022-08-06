import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  signin() {
    this.authService.signin().subscribe((auth) => {
      console.log(auth);
      if (auth.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }
}
