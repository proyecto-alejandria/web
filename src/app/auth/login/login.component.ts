import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'account/account.service';
import { AuthService } from 'auth/auth.service';
import { USERNAME_REGEX } from 'auth/user.model';
import { MainService } from 'main.service';
import { UIService } from 'shared/ui.service';
import { fieldsMatchValidator } from 'shared/validators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(USERNAME_REGEX)]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
  }, {
    validators: [fieldsMatchValidator('password', 'repeatPassword')],
  });

  registerDisabled: boolean = false;

  @ViewChild('registeredDialog')
  private registeredDialog!: TemplateRef<any>;

  constructor(
    private account: AccountService,
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private main: MainService,
    private router: Router,
    private ui: UIService,
  ) { }

  ngOnInit(): void {
    if (!this.main.settings.register) {
      this.registerDisabled = true;
      this.registerForm.disable();
    }
  }

  login(): void {
    this.ui
      .work(this.auth.login(this.loginForm.value), {
        form: this.loginForm,
        extraForms: [this.registerForm],
      })
      .subscribe({
        next: user => {
          this.router.navigateByUrl('/');
          this.ui.message(`¡Hola ${user.first_name}!`);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.ui.message('Credenciales inválidos');
          }
        },
      });
  }

  register(): void {
    this.ui
      .work(this.account.register(this.registerForm.value), {
        form: this.registerForm,
        extraForms: [this.loginForm],
      })
      .subscribe(user => {
        this.dialog.open(this.registeredDialog, {
          data: { user },
        });
      });
  }

}
