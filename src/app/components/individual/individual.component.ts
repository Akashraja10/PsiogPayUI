import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from 'src/app/models/employee.model';
import { AuthGuard } from 'src/app/services/authguard.service';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { TransferComponent } from './transfer/transfer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})


export class IndividualComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;
  
  displayedColumns: string[] = ['empId', 'empFname', 'send'];
  dataSource = new MatTableDataSource();

  //employee:any;
  public fullName: string="";
  public id: Number=(0);
  showForm = false;
  transferForm = new FormGroup({
    senderId:new FormControl(),
    recieverId: new FormControl(),
    amount: new FormControl()
});
  myid:any;


  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private employeeService:EmployeeService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ){}

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

      this.http.get(this.baseApiUrl+"/api/Employee/"+this.id).subscribe(  
        (data: any) => {  this.dataSource=new  MatTableDataSource(data) as any ;
        //console.log(this.dataSource);       
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


    openDialog(action: any,obj: { action: any; }){
      obj.action = action;
      console.log(obj);

      const dialogRef = this.dialog.open(TransferComponent, {
        width: '30em',
        height: '250px',       
        data:obj
        
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
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






  // getData(empid: Number) {
  //   this.http.get(`https://localhost:7290/api/Employee/${empid}`).subscribe(employee => {       
  //       console.log(employee); 
  //       this.employee=employee;    
  //   });
  // }
    
    // updateName(){
    // this.employeeService.updateName().subscribe({
    //   next:(employees)=>{
    //      console.log(employees);   
    //   } 
    //  })
    // }
   
   
  
        // this.http.get<Employee[]>("https://localhost:7290/api/Employee")
      // .subscribe({
      //   next: (employees)=> {
      //     console.log(employees)
      //     this.employees=employees;
      //   },
      //   error: (response)=>{
      //     console.log(response);
      //   }
      // });


      
      // this.employeeService.individualList().subscribe({
      //     next:(employee)=>{
      //        console.log(employee); 
      //        this.employee=employee;  
      //     },
      //     error: (response)=>{
      //       console.log(response);
      //     }
      //   })


