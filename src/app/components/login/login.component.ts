import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm,Validators,ReactiveFormsModule,FormControl, FormGroup   } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticatedResponse, LoginModel } from 'src/app/models/login.model';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({
    Username: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
  });
  invalidLogin: boolean | undefined;
  hide = true;
   public pin:Number=(0);

  constructor(private router: Router,private employeeService:EmployeeService,private http: HttpClient,private _snackBar: MatSnackBar) { }
   ngOnInit(): void {

   }
   get Username(){
 return this.loginForm.get('Username')
   }
   get Password(){
    return this.loginForm.get('Password')
      }
   
 
submit (){
  this.http.post<AuthenticatedResponse>("https://localhost:7290/api/Employee/login", this.loginForm.value,
  {    
  headers: new HttpHeaders({ "Content-Type": "application/json"})  
})
  .subscribe({
    
      next:(response: AuthenticatedResponse)=>{
        const token = response.token;
        localStorage.setItem("jwt", token); 
        this.invalidLogin = false;  
        
        // let pinFromToken=this.auth.getPinFromToken();
        // this.pin=pinFromToken
        // console.log(this.pin)

        this.router.navigate(["dashboard"]);
        console.log(this.loginForm.value);
        
      },
    error: (err: HttpErrorResponse) =>{ 
      this.invalidLogin = true;
      this.router.navigate(["login"]); 
      this.loginForm.reset();
      this.openSnackBar('Incorrect Login!','Close');
    }
  })    
    }
  
    openSnackBar(message: string, action: string) 
    {
      this._snackBar.open(message, action, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  
      






    // export class LoginComponent implements OnInit {
 
    //   credentials: LoginModel = {Username:'', Password:''};
    //   invalidLogin: boolean | undefined;
    
    //   constructor(private router: Router, private http: HttpClient) { }
    //   ngOnInit(): void {
     
    //   }

  // login = () => {
    
  //     this.http.post<AuthenticatedResponse>("https://localhost:7056/api/Employee/authenticate", this.credentials, {
  //       headers: new HttpHeaders({ "Content-Type": "application/json"})
  //     })
  //     .subscribe({
  //       next: (response: AuthenticatedResponse) => {
  //         const token = response.token;
  //         localStorage.setItem("jwt", token); 
  //         this.invalidLogin = false; 
  //         this.router.navigate(["dashboard"]);
  //       },
  //       error: (err: HttpErrorResponse) =>{
  //         this.invalidLogin = true
  //         alert(err.status);
  //       }
  //     })
  //   }
  }


