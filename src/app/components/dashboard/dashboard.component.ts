import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/services/authguard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import {Chart} from 'chart.js/auto';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  public fullName: string="";
  public id: Number=(0);
  public pin:Number=(0);

  notificationCount = 0;
  public chart: any;

  incrementNotificationCount() {
    this.notificationCount++;
  }
  

  constructor(private jwtHelper: JwtHelperService, private router: Router
    ,private http: HttpClient,private employeeService:EmployeeService,
    private auth:AuthGuard,private _snackBar: MatSnackBar,) { }
    

  ngOnInit(): void {


    //this.createsChart();
    
    this.employeeService.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken=this.auth.getFullNameFromToken();
      this.fullName=val || fullNameFromToken
      //console.log(this.fullName)
    });

    this.employeeService.getIdFromStore()
    .subscribe(val=>{
      let idFromToken=this.auth.getidFromToken();
      this.id=val || idFromToken
      //console.log(idFromToken)
    });

    this.employeeService.getPinFromStore()
    .subscribe(val=>{
      let pinFromToken=this.auth.getPinFromToken();
      this.pin=val || pinFromToken
      console.log(val);
      
      if(this.pin==0 || this.pin==null){    
        console.log(this.pin)       
      this.router.navigate(["mypin"]);
      }
      else{
        console.log(this.pin)
        this.router.navigate(["dashboard"])
      }
    })    
  
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
    localStorage.removeItem("");
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
  // createsChart(){
  
  //   this.chart = new Chart("MyChart", {
  //     type: 'bar', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
	// 							 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	//        datasets: [
  //         {
  //           label: "Sales",
  //           data: ['467','576', '572', '79', '92',
	// 							 '574', '573', '576'],
  //           backgroundColor: 'blue'
  //         },
  //         {
  //           label: "Profit",
  //           data: ['542', '542', '536', '327', '17',
	// 								 '0.00', '538', '541'],
  //           backgroundColor: 'limegreen'
  //         }  
  //       ]
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }
      
  //   });
  // }


}
