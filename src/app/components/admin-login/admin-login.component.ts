import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
    this.http.post("https://localhost:7290/api/Employee/admin", this.loginForm.value, {
    headers: new HttpHeaders({ "Content-Type": "application/json"})  
  })
    .subscribe({
        next:()=>{
        
          this.invalidLogin = false;         
          this.router.navigate(["dashboards"]);
          console.log(this.loginForm.value);
        },
      error: (err: HttpErrorResponse) =>{ 
        this.invalidLogin = true;
        this.router.navigate([""]);
      }
    })    
}
}
