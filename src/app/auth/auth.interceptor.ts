import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const AUTH_PATHS_PREFIX = '/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private auth?: AuthService;

  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiUrl + AUTH_PATHS_PREFIX) || !req.url.startsWith(environment.apiUrl)) {
      return next.handle(req.clone());
    }

    if (!this.auth) {
      this.auth = this.injector.get(AuthService);
    }

    return this.auth
      .getAccessToken()
      .pipe(
        map(token => {
          if (token === null) {
            return req.clone();
          }

          return req.clone({
            setHeaders: {
              'Authorization': 'JWT ' + token
            },
          });
        }),
        switchMap(req => next.handle(req))
      );
  }

}
