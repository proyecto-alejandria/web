import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ControlErrorsPipe } from './control-errors.pipe';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { UiWorkingDirective } from './ui-working.directive';


@NgModule({
  declarations: [
    // Pipes
    ControlErrorsPipe,

    // Directives
    UiWorkingDirective,

    // Components
    ConfirmDialogComponent,
    ErrorDialogComponent,
    FormFieldComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    // 3rd party
    LayoutModule,
    FlexLayoutModule,

    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    // 3rd party
    LayoutModule,
    FlexLayoutModule,

    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,

    // Pipes
    ControlErrorsPipe,

    // Directives
    UiWorkingDirective,

    // Components
    FormFieldComponent,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
      },
    },
  ],
})
export class SharedModule { }
