import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recenttransaction',
  templateUrl: './recenttransaction.component.html',
  styleUrls: ['./recenttransaction.component.css']
})
export class RecenttransactionComponent implements OnInit {

  public fullName: string="";
  public id: Number=(0);
  myid:any;
  baseApiUrl: string =environment.baseApiUrl;

  displayedColumns: string[] = ['recieverId', 'amount','time'];
  displayedColumns2: string[] = ['extId', 'content', 'amount',];
  displayedColumns3: string[] = ['groupId', 'reqId', 'amount',];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
   dataSource3 = new MatTableDataSource();

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
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

    this.http.get(this.baseApiUrl+"/api/Recent/"+this.id).subscribe(  
      (data: any) => {  this.dataSource=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);       
    }
      ,(err: any)=>{  
        console.log(err);  
      }
    );

    this.http.get(this.baseApiUrl+"/api/External/"+this.id).subscribe(  
      (data: any) => {  this.dataSource2=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource2);       
    }
      ,(err: any)=>{  
        console.log(err);  
      }
    );

    this.http.get(this.baseApiUrl+"/api/GroupRecent/"+this.id).subscribe(  
      (data: any) => {  this.dataSource3=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource3);       
    }
      ,(err: any)=>{  
        console.log(err);  
      }
    );

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
    this.openSnackBar('Logged Out!','Close'); 
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
