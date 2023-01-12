import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndividualComponent } from './components/individual/individual.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentsuccessfulComponent } from './components/paymentsuccessful/paymentsuccessful.component';
import { SignupComponent } from './components/signup/signup.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { AuthGuard } from './services/authguard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard/individual',
    component: IndividualComponent,
    canActivate:[AuthGuard]
     
  },
  {
    path:'dashboard/wallet',
    component: WalletComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'paysuccess',
    component: PaymentsuccessfulComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
