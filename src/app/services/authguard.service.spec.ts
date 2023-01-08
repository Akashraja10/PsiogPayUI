import { TestBed, } from '@angular/core/testing';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuard } from './authguard.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    ]
    });
    guard = TestBed.inject(AuthGuard);
  
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});