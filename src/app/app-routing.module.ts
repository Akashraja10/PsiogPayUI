import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExternalComponent } from './components/external/external.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { IndividualComponent } from './components/individual/individual.component';
import { TransferComponent } from './components/individual/transfer/transfer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentsuccessfulComponent } from './components/paymentsuccessful/paymentsuccessful.component';
import { RequestComponent } from './components/request/request.component';
import { SampleComponent } from './components/sample/sample.component';
import { SignupComponent } from './components/signup/signup.component';
import { ModelTransferComponent } from './components/wallet/model-transfer/model-transfer.component';
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
    path: 'dashboards',
    component: BarChartComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard/individual',
    component: IndividualComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'dashboard/individual/transfer',
    component: TransferComponent,
    canActivate:[AuthGuard]
     
  },
  {
    path:'dashboard/wallet',
    component: WalletComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard/wallet/transfer',
    component: ModelTransferComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard/external',
    component: ExternalComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard/request',
    component: RequestComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'paysuccess',
    component: PaymentsuccessfulComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'sample',
    component: SampleComponent,
    canActivate:[AuthGuard]
  },
    {
    path:'forgetpassword',
    component: ForgetpasswordComponent,
    canActivate:[AuthGuard]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
