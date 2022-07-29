import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
