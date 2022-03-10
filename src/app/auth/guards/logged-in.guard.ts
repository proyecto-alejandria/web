import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from 'auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    protected auth: AuthService,
    protected router: Router,
  ) { }

  protected doCheck(): boolean | UrlTree {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    return this.router.parseUrl('/acceder');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.doCheck();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.doCheck();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.doCheck();
  }

}
