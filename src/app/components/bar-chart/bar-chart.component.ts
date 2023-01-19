import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import {Chart} from 'chart.js/auto';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  baseApiUrl: string =environment.baseApiUrl;
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
    
    ) { }

  ngOnInit(): void {

     this.createChart();

      this.chartData = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: this.time,
           datasets: [
            {
              label: "Amount",
              data: this.amount,
              backgroundColor: 'blue'
            },
          ]
        },
        options: {
          plugins:{
          legend: {  
            display: true ,
            	      
          },  
        },
          scales: {  
            x: {
              ticks: {  
              display: false
              }  
            },  
            y: {
              ticks: {  
              display: false
              }  
            },  
        }
      }
      });
    }
  

  createChart(){
    this.http.get(this.baseApiUrl+"/api/Individual/"+this.id).subscribe(data => {
    
      this.chartData.data.labels = this.chartData.time;
      this.chartData.data.datasets[0].data = this.chartData.amount;
      this.chartData.update();
      console.log(this.chartData)
  });
  
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
  openSnackBar(message: string, action: string) 
  {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
 
    

}
