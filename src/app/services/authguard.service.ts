import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


  export class  AuthGuard implements CanActivate {

    private baseUrl:string="https://localhost:7290/api/Emploee/"
    private empPayload:any;
    constructor(private http:HttpClient,private route:Router,private jwthelper: JwtHelperService ){
      this.empPayload= this.decodeToken();
    }

    canActivate(
         route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      const token = localStorage.getItem("jwt");
      if (token && !this.jwthelper.isTokenExpired(token)){
        //console.log(this.jwthelper.decodeToken(token))
        return true;
      }
      this.route.navigate(["login"]);
      return false;
         }
          
  storeToken(tokenValue: string){
    localStorage.setItem('jwt',tokenValue)
  }
  getToken(){
    return localStorage.getItem("jwt")
  }
  decodeToken(){
     const jwtHelper=new JwtHelperService();
     const token=this.getToken()!;
     console.log(jwtHelper.decodeToken(token))
     return jwtHelper.decodeToken(token)
  }
  getidFromToken(){
    if(this.empPayload)
    return this.empPayload.certserialnumber
  }
  getFullNameFromToken(){
    if(this.empPayload)
    return this.empPayload.unique_name
  }
  
  
}
// export class AuthGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     // Check if the user is authenticated
//     const isAuthenticated = checkIfAuthenticated();

//     if (!isAuthenticated) {
//       // Redirect the user to the login page
//       return navigateToLoginPage();
//     }

//     return isAuthenticated;
//   }
// }


// export class AuthGuard implements CanActivate {
//   constructor(private router:Router, private jwtHelper: JwtHelperService){}
  
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
//       const token = localStorage.getItem("jwt");
//       if (token && !this.jwtHelper.isTokenExpired(token)){
//         console.log(this.jwtHelper.decodeToken(token))
//         return true;
//       }
//       this.router.navigate(["login"]);
//       return false;  
//   }





