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

}
