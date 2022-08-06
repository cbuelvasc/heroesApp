import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { MaterialModule } from '../material/material.module';
import { SignoutComponent } from './pages/signout/signout.component';

@NgModule({
  declarations: [SignupComponent, SigninComponent, SignoutComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
