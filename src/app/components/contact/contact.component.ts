import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

loading = false;
buttionText = "Submit";

transferForm = new FormGroup({
  name:new FormControl(),
  email: new FormControl(),
});


  constructor(private http: HttpClient,private router: Router,) { }

  ngOnInit(): void {
    
  }
  get name() {
    return this.transferForm.get('name')
  }

  get Email() {
    return this.transferForm.get('email')
  }

  register() {

    console.log(this.transferForm.value);
    this.http.post("https://localhost:7290/api/Employee/contact", this.transferForm.value,{  
    })
    .subscribe({
      next:()=>{     
        //this.router.navigate(["login"]);
        console.log(
          `👏 > 👏 > 👏 > 👏 ${this.name} is successfully register and mail has been sent and the message id is ${this.Email}`
        );
        console.log(this.transferForm.value);
      },
      error:(err)=>{
        console.log(err);
      }
   
  })    
    }
  }
//       data => {
//         let res:any = data; 
//         console.log(
//           `👏 > 👏 > 👏 > 👏 ${name} is successfully register and mail has been sent and the message id is ${res.messageId}`
//         );
//       },
//       err => {
//         console.log(err);
//         this.loading = false;
//         this.buttionText = "Submit";
//       },() => {
//         this.loading = false;
//         this.buttionText = "Submit";
//       }
//     );
//   }
// }
