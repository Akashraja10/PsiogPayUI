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
  selector: 'app-model-transfer',
  templateUrl: './model-transfer.component.html',
  styleUrls: ['./model-transfer.component.css']
})
export class ModelTransferComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;

  public fullName: string="";
  public id: Number=(0);
  transferForm = new FormGroup({
    walletAmount: new FormControl()
});
 

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    public dialogRef: MatDialogRef<ModelTransferComponent>,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.employeeService.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName=val || fullNameFromToken
      console.log(this.fullName)
    });

    this.employeeService.getIdFromStore()
    .subscribe(val=>{
      let idFromToken=this.auth.getidFromToken();
      this.id=val || idFromToken       
      console.log(this.id)
    });
}

doAction(){
  this.http.put(this.baseApiUrl+"/api/SelfWallet/"+this.id,this.transferForm.value)
  .subscribe({ 
    next:(res)=>{
      console.log(res),
      this.dialogRef.close({event:'Cancel'});
      this.openSnackBar('Wallet Amount Added!','Close');  
      this.router.navigate(["paysuccess"]);
    },
    error:(err)=>{
      console.log(err);
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




