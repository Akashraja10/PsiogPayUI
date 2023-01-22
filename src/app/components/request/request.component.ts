import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import { LendTransferComponent } from './lend-transfer/lend-transfer.component';
import { ReqTransferComponent } from './req-transfer/req-transfer.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;

  displayedColumns: string[] = ['requestID','name', 'reason', 'quotedAmount','recievedAmount','send'];
  displayedColumns2:string[] = ['groupId', 'contributorId','empFname','amount','sent'];
  
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  //dataSource: any=null
  //dataSource2: any =null
  dataSources: any =null
  
  public fullName: string="";
  public id: Number=(0);

  reqForm = new FormGroup({
    empId: new FormControl(),
    purpose: new FormControl(),
    quotedAmount: new FormControl(),
});
myid:any;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    public dialog: MatDialog,
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
        this.myid=this.id;
        console.log(this.id)
      });

      this.http.get(this.baseApiUrl+"/api/Group/"+this.id).subscribe(  
        (data: any) => {  this.dataSource=new  MatTableDataSource(data) as any ;
        console.log(this.dataSource);       
      }
        ,(err: any)=>{  
          console.log(err);  
        }
      )

      this.http.get(this.baseApiUrl+"/api/LendBack/"+this.id).subscribe(  
        (data: any) => {  this.dataSource2=new  MatTableDataSource(data) as any ;
        console.log(this.dataSource2);       
      }
        ,(err: any)=>{  
          console.log(err);  
        }
      )
 

  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }
  
  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['login']);
  }

  submit(){
    this.http.post(this.baseApiUrl+"/api/Group/request",this.reqForm.value)
    .subscribe({ 
      next:(res)=>{
        console.log(res),
        this.openSnackBar('Request Created Successfully !','Close'); 
        this.reqForm.reset();
      },
      error:(err)=>{
        console.log(err);
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
  openDialog(action: any,obj: { action: any; }){
    obj.action = action;
    console.log(obj);

    const dialogRef = this.dialog.open(ReqTransferComponent, {
      width: '30em',
      height: '250px',       
      data:obj
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
  openDialog2(action: any,obj: { action: any; }){
    obj.action = action;
    console.log(obj);

    const dialogRef = this.dialog.open(LendTransferComponent, {
      width: '30em',
      height: '250px',       
      data:obj
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

}
