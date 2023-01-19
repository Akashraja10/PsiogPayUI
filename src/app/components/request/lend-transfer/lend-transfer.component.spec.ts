import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendTransferComponent } from './lend-transfer.component';

describe('LendTransferComponent', () => {
  let component: LendTransferComponent;
  let fixture: ComponentFixture<LendTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
