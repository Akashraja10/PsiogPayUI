import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTransferComponent } from './open-transfer.component';

describe('OpenTransferComponent', () => {
  let component: OpenTransferComponent;
  let fixture: ComponentFixture<OpenTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
