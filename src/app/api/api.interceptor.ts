import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ACCESS_DENIED_ERROR, CONNECTION_ERROR, NOT_FOUND_ERROR, SERVER_ERROR } from 'shared/errors';
import { UIService } from 'shared/ui.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private ui: UIService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof ProgressEvent) {
            this.ui.message(CONNECTION_ERROR);
          } else if (err.status === 403) {
            this.ui.message(ACCESS_DENIED_ERROR);
          } else if (err.status === 404) {
            this.ui.message(NOT_FOUND_ERROR);
          } else if (err.status > 404) {
            this.ui.message(SERVER_ERROR);
          }
        },
      }),
    );
  }

}
