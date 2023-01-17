import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;


  public fullName: string="";
  public id: Number=(0); 
  wallet: any;
  showForm = false;
  public transferForm = new FormGroup({
    amount: new FormControl(),
    content:new FormControl(),
    empId:new FormControl()
  });
  myid:any;
  
  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    private _snackBar: MatSnackBar,) { }

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
        this.myid=this.id;
        console.log(this.id)
      });

  }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }
  
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['login']);
  }
  
  submit(){
    this.http.post(this.baseApiUrl+"/api/External/external",this.transferForm.value)
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.openSnackBar('Transfer Successfully !','Close'); 
        this.router.navigate(['paysuccess']);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  openSnackBar(message: string, action: string) 
{
  this._snackBar.open(message, action, {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  });

}
}
