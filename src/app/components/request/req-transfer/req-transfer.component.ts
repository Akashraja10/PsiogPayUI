import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-req-transfer',
  templateUrl: './req-transfer.component.html',
  styleUrls: ['./req-transfer.component.css']
})
export class ReqTransferComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;

  public fullName: string="";
  public id: Number=(0);

  myname:any;
  myid: any;

  transferForm = new FormGroup({
    reqId:new FormControl(),
    contributorId: new FormControl(),
    amount: new FormControl()
});
  

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    public dialogRef: MatDialogRef<ReqTransferComponent>,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    
    this.employeeService.getFullNameFromStore()
      .subscribe(val=>{
        let fullNameFromToken=this.auth.getFullNameFromToken();
        this.fullName=val || fullNameFromToken
        this.myname=this.fullName;
        console.log(this.fullName)
      });

      this.employeeService.getIdFromStore()
      .subscribe(val=>{
        let idFromToken=this.auth.getidFromToken();
        this.id=val || idFromToken  
        this.myid=this.id;     
        console.log(this.id)
      });
  }

  doAction(){
    this.http.post (this.baseApiUrl+"/api/Group/group",this.transferForm.value,{
    headers: new HttpHeaders({statusText: 'OK'},) 
    })
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.dialogRef.close({event:'Cancel'});
        this.openSnackBar('Contributed Successfully !','Close');  
        this.router.navigate(['paysuccess']);
      },
      error:(err)=>{
        console.log(err);
        this.dialogRef.close({event:'Cancel'});
        this.openSnackBar('Insufficient Wallet Amount !','Close');
        this.router.navigate(["payunsuccess"]);
      }
    });
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
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


