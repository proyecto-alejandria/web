import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, filter, Observable, tap } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogConfig } from './confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent, ErrorDialogConfiguration } from './error-dialog/error-dialog.component';

export interface WorkOptions {

  form?: FormGroup;

  extraForms?: FormGroup[];

};

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private workingSubject = new BehaviorSubject<boolean>(false);

  readonly working = this.workingSubject.asObservable();

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  public isWorking(): boolean {
    return this.workingSubject.value;
  }

  public startWorking(): boolean {
    if (this.isWorking()) {
      return false;
    } else {
      this.workingSubject.next(true);
      return true;
    }
  }

  public stopWorking(): void {
    if (this.isWorking()) {
      this.workingSubject.next(false);
    }
  }

  public message(text: string, action: string = 'Ok'): Observable<void> {
    return this.snackbar.open(text, action).onAction();
  }

  public work<T>(observable: Observable<T>, options: WorkOptions = {}): Observable<T> {
    const opts: WorkOptions = {
      ...options,
    };

    if (!this.startWorking() || opts.form?.invalid) {
      return EMPTY;
    }

    const forms: FormGroup[] = [
      ...opts.extraForms || [],
    ];

    if (opts.form) {
      forms.push(opts.form);
    }

    for (const form of forms) {
      form.disable();
    }

    const workingSnackBar = this.snackbar.open('Cargando...', undefined, {
      duration: undefined,
    });

    const finish = () => {
      for (const form of forms) {
        form.enable();
      }

      workingSnackBar.dismiss();

      this.stopWorking();
    };

    return observable.pipe(
      tap({
        complete: () => {
          opts.form?.reset();

          finish();
        },
        error: (err: HttpErrorResponse) => {
          finish();

          if (err.status !== 400 || !opts.form) {
            return;
          }

          const unknownErrors: string[] = [];

          for (let [field, errors] of Object.entries<string[]>(err.error)) {
            const control = opts.form.get(field);

            if (control === null) {
              unknownErrors.push(`${field}: ${errors}`);
              continue;
            }

            control.setErrors({
              ...control.errors,
              ...errors,
            });
          }

          if (unknownErrors.length) {
            const config: ErrorDialogConfiguration = {
              title: 'Errores desconocidos',
              description: 'Han ocurrido uno o más errores desconocidos:',
              errors: unknownErrors,
            };

            this.dialog.open(ErrorDialogComponent, {
              data: config,
            });
          }
        },
      }),
    );
  }

  confirm(question: string, wait: boolean = false): Observable<void> {
    const config: ConfirmDialogConfig = {
      question,
      wait,
    };

    return this.dialog
      .open(ConfirmDialogComponent, {
        data: config,
      })
      .afterClosed()
      .pipe(
        filter(val => val === true),
      );
  }

}
