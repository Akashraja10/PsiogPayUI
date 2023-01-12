import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;

  public fullName: string="";
  public id: Number=(0);
  wallet: any;
  showForm = false;
  public transferForm = new FormGroup({
    walletAmount: new FormControl(),
  });

  constructor( private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,) { }

    ngOnInit(): void {
      this.employeeService.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFromToken();
        this.fullName=val || fullNameFromToken
      });

      this.employeeService.getIdFromStore()
      .subscribe(val=>{
        let idFromToken=this.auth.getidFromToken();
        this.id=val || idFromToken
        console.log(this.id)
      });

      this.http.get(this.baseApiUrl+"/api/SelfWallet/"+this.id).subscribe({
        next:(wallet)=>{
           console.log(wallet); 
           this.wallet=wallet;  
        },
        error: (response)=>{
          console.log(response);
        }
      })
  }

  submit(){
    this.http.put(this.baseApiUrl+"/api/SelfWallet/"+this.id,this.transferForm.value)
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.router.navigate(["paysuccess"]);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
};



      // this.employeeService.getWalletAccDetails().subscribe({
      //   next:(wallet)=>{
      //     console.log(wallet); 
      //     this.wallet=wallet;  
      //  },
      //  error: (response)=>{
      //    console.log(response);
      //  }
      // })