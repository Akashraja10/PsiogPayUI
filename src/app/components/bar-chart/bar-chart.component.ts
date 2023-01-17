import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  public chart: any;
  time:any;
  amount:any;
  myid: any;
  employee: any;


  constructor(
    private employeeService:EmployeeService,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private auth:AuthGuard,
    ) { }

  ngOnInit(): void {
     this.createChart();

     this.employeeService.getIdFromStore()
      .subscribe(val=>{
        let idFromToken=this.auth.getidFromToken();
        this.id=val || idFromToken
        this.myid=this.id;
        console.log(this.id)
      });
  }

  createChart(){
    this.http.get(this.baseApiUrl+"/api/Individual/"+this.id).subscribe({
      next:(employee)=>{
         console.log(employee); 
         this.employee=employee;  
      },
      error: (response)=>{
        console.log(response);
      }
    });
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.time,
	       datasets: [
          {
            label: "Sales",
            data: this.amount,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }


}
