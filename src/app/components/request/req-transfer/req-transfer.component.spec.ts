import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqTransferComponent } from './req-transfer.component';

describe('ReqTransferComponent', () => {
  let component: ReqTransferComponent;
  let fixture: ComponentFixture<ReqTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
