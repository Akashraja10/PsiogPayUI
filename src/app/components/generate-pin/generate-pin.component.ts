import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from 'src/app/models/login.model';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.css']
})
export class GeneratePinComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;
  public fullName: string="";
  public id: Number=(0);
  public pins:Number=(0);

  notificationCount = 0;
  incrementNotificationCount() {
    this.notificationCount++;
  }

  form = new FormGroup({
    pin: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(4)]),
  });
  invalid: boolean | undefined;


  constructor(private jwtHelper: JwtHelperService, private router: Router
    ,private http: HttpClient,private employeeService:EmployeeService,
    private auth:AuthGuard,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    this.employeeService.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName=val || fullNameFromToken
      //console.log(this.fullName)
    });

    this.employeeService.getIdFromStore()
    .subscribe(val=>{
      let idFromToken=this.auth.getidFromToken();
      this.id=val || idFromToken
      //console.log(idFromToken)
    });

    this.employeeService.getPinFromStore()
    .subscribe(val=>{
      let pinFromToken=this.auth.getPinFromToken();
      this.pins=val || pinFromToken
      //console.log(pinFromToken);
    })
  }

  get pin() {
    return this.form.get('pin')
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("");
    this.router.navigate(['login']);
    this.openSnackBar('Logged Out!','Close');
  }
  submit(){
    this.http.post(this.baseApiUrl+"/api/Employee/"+this.id, this.form.value)
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.invalid = false;         
        localStorage.removeItem("jwt");
        localStorage.removeItem("");
        this.router.navigate(["login"]);
        this.openSnackBar('PIN Set Successfully !','Close');
        //this.openSnackBar('Login Again!','Close'); 
      },
      error:(err)=>{
        console.log(err);
        this.invalid= true; 
        this.openSnackBar('Error! Try Again','Close'); 
        this.form.reset();
        this.router.navigate(['mypin']);
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
