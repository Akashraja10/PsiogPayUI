import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentunsuccessful',
  templateUrl: './paymentunsuccessful.component.html',
  styleUrls: ['./paymentunsuccessful.component.css']
})
export class PaymentunsuccessfulComponent implements OnInit {

  showComponent= true;

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
