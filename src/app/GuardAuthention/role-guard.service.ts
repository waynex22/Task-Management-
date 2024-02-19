
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['requiredRoles'];
    if (this.authService.hasRoles(requiredRoles)) {  
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
