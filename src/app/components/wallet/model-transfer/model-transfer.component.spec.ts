import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTransferComponent } from './model-transfer.component';

describe('ModelTransferComponent', () => {
  let component: ModelTransferComponent;
  let fixture: ComponentFixture<ModelTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
