import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signUpForm = new FormGroup({
    EmpFname: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]),
    EmpLname: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('[a-zA-Z ]*')]),
    Username: new FormControl('',[Validators.required,Validators.minLength(6)]),
    Password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    Email: new FormControl('',[Validators.required,Validators.email]),
    Age: new FormControl('',[Validators.required,Validators.pattern('^(?:|1[7-9]|[2-9][0-9])$')]),
    Gender: new FormControl('',[Validators.required,Validators.minLength(1)]) 
  });
  invalidLogin: boolean | undefined; //^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$

  constructor(private router: Router,private http: HttpClient){}
  ngOnInit(): void {
      }

  get EmpFname() {
    return this.signUpForm.get('EmpFname')
  }
  get EmpLname() {
    return this.signUpForm.get('EmpLname')
  }
  get Username() {
    return this.signUpForm.get('Username')
  }
  get Password() {
    return this.signUpForm.get('Password')
  }
  get Email() {
    return this.signUpForm.get('Email')
  }
  get Age() {
    return this.signUpForm.get('Age')
  }
  get Gender() {
    return this.signUpForm.get('Gender')
  }
    
   signup(){
    console.log(this.signUpForm.value);
    this.http.post("https://localhost:7290/api/Employee/register", this.signUpForm.value,{
      headers: new HttpHeaders({ "Content-Type": "application/json"})  
    })
    .subscribe({
      next:()=>{
        this.invalidLogin = false; 
        this.router.navigate(["login"]);
        console.log(this.signUpForm.value);
      },
    error: (err: HttpErrorResponse) => this.invalidLogin = true
  })    
    }
  }

// export class SignupComponent implements OnInit {
  
//   rgs:RegisterModel={
//     EmpFname: "",
//     EmpLname: "",
//     Username: "",
//     Password: "",
//     Email: "",
//     Age: 0,
//     Gender: ""   
// };
// invalidLogin: boolean | undefined;
         
  
//   constructor(private router: Router,private http: HttpClient) { }


//   ngOnInit(): void {
//   }

//   signup(){
//     this.http.post<RegisterModel>("https://localhost:7056/api/Employee/register", this.rgs)
//     .subscribe((rgs:RegisterModel)=>{
//     console.log(rgs);
//     this.router.navigate(["/login"]);
//     error: (err: HttpErrorResponse) => this.invalidLogin = true
//   })    
//     }
//   }

