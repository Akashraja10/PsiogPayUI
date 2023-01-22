import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentunsuccessfulComponent } from './paymentunsuccessful.component';

describe('PaymentunsuccessfulComponent', () => {
  let component: PaymentunsuccessfulComponent;
  let fixture: ComponentFixture<PaymentunsuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentunsuccessfulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentunsuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
