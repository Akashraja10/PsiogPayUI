import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentsuccessful',
  templateUrl: './paymentsuccessful.component.html',
  styleUrls: ['./paymentsuccessful.component.css']
})
export class PaymentsuccessfulComponent implements OnInit {

  showComponent = true;
  constructor(private router:Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.showComponent = false;
      this.router.navigate(['/dashboard']);
    }, 5000);
  }

  goToHome() {
    this.router.navigate(['/dashboard']);
}

}

