import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm,Validators,ReactiveFormsModule,FormControl, FormGroup   } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticatedResponse, LoginModel } from 'src/app/models/login.model';

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

  constructor(private router: Router, private http: HttpClient) { }
   ngOnInit(): void {

   }
   get Username(){
 return this.loginForm.get('Username')
   }
   get Password(){
    return this.loginForm.get('Password')
      }
   
 
submit (){
  this.http.post<AuthenticatedResponse>("https://localhost:7290/api/Employee/login", this.loginForm.value, {
  headers: new HttpHeaders({ "Content-Type": "application/json"})  
})
  .subscribe({
      next:(response: AuthenticatedResponse)=>{
        const token = response.token;
        localStorage.setItem("jwt", token); 
        this.invalidLogin = false; 
        
        this.router.navigate(["dashboard"]);
        console.log(this.loginForm.value);
      },
    error: (err: HttpErrorResponse) => this.invalidLogin = true
  })    
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


