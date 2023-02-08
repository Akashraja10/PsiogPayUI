import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/models/login.model';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  loginForm = new FormGroup({
    Username: new FormControl('',Validators.required),
    Email: new FormControl('',Validators.required),
    ConfirmPassword: new FormControl('',Validators.required),
  });
  invalidLogin: boolean | undefined;
  hide = true;

  constructor(private router: Router, private http: HttpClient,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }
  get Username(){
    return this.loginForm.get('Username')
  }
  get ConfirmPassword(){
    return this.loginForm.get('Password')
   }
  get Email(){
    return this.loginForm.get('Email')
   }

   submit (){
    this.http.post<AuthenticatedResponse>("https://localhost:7290/api/Employee/forgotPassword", this.loginForm.value, {
    headers: new HttpHeaders({ "Content-Type": "application/json"})  
  })
    .subscribe({
        next:(response: AuthenticatedResponse)=>{
          this.invalidLogin = false;  
          this.openSnackBar('Password  Successfully Changed','Close');        
          this.router.navigate(["/login"]);
          
        },
      error: (err: HttpErrorResponse) => {
      this.invalidLogin = true;
      this.openSnackBar('Invalid Entry','Close');        
      this.router.navigate(["/login"]);
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
}
