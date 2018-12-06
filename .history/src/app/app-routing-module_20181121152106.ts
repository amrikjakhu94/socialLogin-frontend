import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetnewpasswordComponent } from './setnewpassword/setnewpassword.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '' , component: SigninComponent },
  { path: 'signup' , component: SignupComponent },
  { path: 'forgotpassword' , component: ForgotpasswordComponent },
  { path: 'setnewpassword' , component: SetnewpasswordComponent },
  { path: 'dashboard' , component : DashboardComponent ,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }