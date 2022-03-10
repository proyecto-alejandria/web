import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard extends LoggedInGuard {

  protected override doCheck(): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return true;
    }

    return this.router.parseUrl('/');
  }

}
