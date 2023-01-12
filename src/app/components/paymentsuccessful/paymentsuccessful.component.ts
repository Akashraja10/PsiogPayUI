import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentsuccessful',
  templateUrl: './paymentsuccessful.component.html',
  styleUrls: ['./paymentsuccessful.component.css']
})
export class PaymentsuccessfulComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
}

}
