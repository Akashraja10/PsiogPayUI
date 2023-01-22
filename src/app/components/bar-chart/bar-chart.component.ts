import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import {Chart} from 'chart.js/auto';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import { OpenTransferComponent } from './open-transfer/open-transfer.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  baseApiUrl: string =environment.baseApiUrl;
  
  displayedColumns: string[] = ['empId','username', 'empFname','age','send'];
  dataSource = new MatTableDataSource();


  public id: Number=(0);
  time:any;
  amount:any;
  myid: any;
  employee: any;
  chartData: any;
  chart:any;


  constructor(
    private employeeService:EmployeeService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    
    ) { }

  ngOnInit(): void {
    this.http.get(this.baseApiUrl+"/api/Employee/").subscribe(  
      (data: any) => {  this.dataSource=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);       
    }
      ,(err: any)=>{  
        console.log(err);  
      }
    );
  }

    //  this.createChart();

    //   this.chartData = new Chart("MyChart", {
    //     type: 'bar', //this denotes tha type of chart
  
    //     data: {// values on X-Axis
    //       labels: this.time,
    //        datasets: [
    //         {
    //           label: "Amount",
    //           data: this.amount,
    //           backgroundColor: 'blue'
    //         },
    //       ]
    //     },
    //     options: {
    //       plugins:{
    //       legend: {  
    //         display: true ,
            	      
    //       },  
    //     },
    //       scales: {  
    //         x: {
    //           ticks: {  
    //           display: false
    //           }  
    //         },  
    //         y: {
    //           ticks: {  
    //           display: false
    //           }  
    //         },  
    //     }
    //   }
    //   });
    // }
  

  // createChart(){
  //   this.http.get(this.baseApiUrl+"/api/Individual/"+this.id).subscribe(data => {
    
  //     this.chartData.data.labels = this.chartData.time;
  //     this.chartData.data.datasets[0].data = this.chartData.amount;
  //     this.chartData.update();
  //     console.log(this.chartData)
  // });
  
  // }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }
  
  logOut = () => {
    this.router.navigate(['admin']);
    this.openSnackBar('Logged Out!','Close'); 
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

    const dialogRef = this.dialog.open(OpenTransferComponent, {
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
 
    

}
