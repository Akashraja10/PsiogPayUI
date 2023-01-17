import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  constructor(private employeeservice: EmployeeService,private http: HttpClient) { }
  
  baseApiUrl: string =environment.baseApiUrl;
  displayedColumns: string[] = ['empId', 'empFname',];
  dataSource = new MatTableDataSource();
  
  ngOnInit(): void {

    this.http.get(this.baseApiUrl+"/api/Employee/1").subscribe(  
      (data: any) => {  this.dataSource=new  MatTableDataSource(data) as any ;
      console.log(this.dataSource);
      
    }
      ,(err: any)=>{  
        console.log(err);  
      }
    )
  
  }
}
