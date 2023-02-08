import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.css']
})
export class EnterPinComponent implements OnInit {

  baseApiUrl: string =environment.baseApiUrl;
  public pins:Number=(0);
  public id:Number=(0);

  form = new FormGroup({
    pin: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(4)]),
  });

  constructor(private jwtHelper: JwtHelperService, private router: Router
    ,private http: HttpClient,private employeeService:EmployeeService,
    private auth:AuthGuard,private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

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


submit(){
  this.http.post(this.baseApiUrl+"/api/Individual/"+this.id, this.form.value)
  .subscribe({ 
    next:(res)=>{
      console.log(res), 
      this.openSnackBar('Transfer Successfully !','Close');       
      this.router.navigate(["paysuccess"]);
    },
    error:(err)=>{
      console.log(err);
      this.openSnackBar('Error in PIN! Try Again','Close'); 
      this.form.reset();
      this.router.navigate(['enterpin']);
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
