import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MustLoggedInGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('token');
      if (!token) this.router.navigate(['/signin']); 
      return !!token;
  }
}
