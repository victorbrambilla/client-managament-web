import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.getAuthenticationStatus();
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      await this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}