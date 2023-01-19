import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IndividualComponent } from './components/individual/individual.component';
import { MatMenuModule} from '@angular/material/menu';
import { WalletComponent } from './components/wallet/wallet.component';
import { PaymentsuccessfulComponent } from './components/paymentsuccessful/paymentsuccessful.component';
import { ExternalComponent } from './components/external/external.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { SampleComponent } from './components/sample/sample.component';
import { MatTableModule } from '@angular/material/table';
import { TransferComponent } from './components/individual/transfer/transfer.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModelTransferComponent } from './components/wallet/model-transfer/model-transfer.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { RequestComponent } from './components/request/request.component';
import { ReqTransferComponent } from './components/request/req-transfer/req-transfer.component';
import { LendTransferComponent } from './components/request/lend-transfer/lend-transfer.component';
import { ContactComponent } from './components/contact/contact.component';
import { RecenttransactionComponent } from './components/recenttransaction/recenttransaction.component';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    IndividualComponent,
    WalletComponent,
    PaymentsuccessfulComponent,
    ExternalComponent,
    SampleComponent,
    TransferComponent,
    ModelTransferComponent,
    ForgetpasswordComponent,
    BarChartComponent,
    RequestComponent,
    ReqTransferComponent,
    LendTransferComponent,
    ContactComponent,
    RecenttransactionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSidenavModule,
       
    
 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [/*{
    provide: MatDialogRef,
  }*/],

  bootstrap: [AppComponent]
})
export class AppModule { }
