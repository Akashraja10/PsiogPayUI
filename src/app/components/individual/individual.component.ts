import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from 'src/app/models/employee.model';
import { AuthGuard } from 'src/app/services/authguard.service';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../../services/employee.service';



@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  baseApiUrl: string =environment.baseApiUrl;

  //employees: Employee[]=[];
  //employees:any;

  employee:any;
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
    private employeeService:EmployeeService,){}

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


      this.http.get(this.baseApiUrl+"/api/Employee/"+this.id).subscribe({
        next:(employee)=>{
           console.log(employee); 
           this.employee=employee;  
        },
        error: (response)=>{
          console.log(response);
        }
      });
    };
  


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
      this.http.post(this.baseApiUrl+"/api/Individual/individual",this.transferForm.value)
      .subscribe({ 
        next:(res)=>{
          console.log(res),
          this.router.navigate(['paysuccess']);
        },
        error:(err)=>{
          console.log(err);
        }
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


