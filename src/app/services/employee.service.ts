import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseApiUrl: string =environment.baseApiUrl;
  loginForm: any;

  private fullName$= new BehaviorSubject<string>("");
  private id$= new BehaviorSubject<Number>(0);
  constructor(private http: HttpClient) {}

  individualList(){
    return this.http.get(this.baseApiUrl+ `/api/Employee/1`);
    }

    public getIdFromStore(){
      return this.id$.asObservable();
    }
    public setIdFromStore(id:Number){
      this.id$.next(id)
    }
    public getFullNameFromStore(){
      return this.fullName$.asObservable();
    }
    public setFullNameFromStore(fullname:string){
      this.fullName$.next(fullname)
    }



}
