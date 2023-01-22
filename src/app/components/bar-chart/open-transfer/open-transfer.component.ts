import { HttpClient } from '@angular/common/http';
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
  selector: 'app-open-transfer',
  templateUrl: './open-transfer.component.html',
  styleUrls: ['./open-transfer.component.css']
})
export class OpenTransferComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;
  myid: any;

  transferForm = new FormGroup({  
    id: new FormControl(),  
});

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    public dialogRef: MatDialogRef<OpenTransferComponent>,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }

  doAction(){
    this.http.delete(this.baseApiUrl+"/api/Employee/"+this.myid)
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.dialogRef.close({event:'Cancel'});
        this.openSnackBar('Employee Deleted Successfully !','Close');  
        window.location.reload();
        this.router.navigate(['dashboards']);
      },
      error:(err)=>{
        console.log(err);
        this.dialogRef.close({event:'Cancel'});
        this.openSnackBar('Employee Not Available !','Close');  
        this.router.navigate(['dashboards']);
      }
    });
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
  openSnackBar(message: string, action: string) 
{
  this._snackBar.open(message, action, {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  });

}

}
