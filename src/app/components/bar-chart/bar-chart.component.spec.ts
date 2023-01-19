import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BarChartComponent } from './bar-chart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatSnackBarModule],
      declarations: [ BarChartComponent ],
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
