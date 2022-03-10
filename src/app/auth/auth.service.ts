import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'api/api.service';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User, UserDto } from './user.model';


const JWT_STORAGE_KEY = 'stok';
const JWT_EXP_OFFSET = 10;

const LOGIN_PATH = '/auth/jwt/create/';
const REFRESH_TOKEN_PATH = '/auth/jwt/refresh/';

const USERDATA_PATH = '/users/me/';

interface LoginResult {

  access: string;

  refresh: string;

};

export interface LoginCredentials {

  email: string;

  password: string;

};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private refreshingAccess: Observable<any> | null = null;

  private userSubject = new BehaviorSubject<User | null>(null);

  readonly currentUser = this.userSubject.asObservable();

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  private setTokens(access: string, refresh: string): void {
    this.accessToken = access;
    this.refreshToken = refresh;

    localStorage.setItem(JWT_STORAGE_KEY, refresh);
  }

  private clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;

    localStorage.removeItem(JWT_STORAGE_KEY);
  }

  private loadUser(): Observable<User> {
    return this.api
      .get<UserDto>(USERDATA_PATH)
      .pipe(
        map(dto => new User(dto)),
        tap(user => this.userSubject.next(user))
      );
  }

  getAccessToken(): Observable<string | null> {
    if (this.accessToken !== null && !this.jwtHelper.isTokenExpired(this.accessToken)) {
      return of(this.accessToken);
    }

    if (this.refreshToken === null) {
      return of(null);
    }

    if (this.jwtHelper.isTokenExpired(this.refreshToken)) {
      this.logout();

      return of(null);
    }

    if (this.refreshingAccess !== null) {
      return this.refreshingAccess;
    }

    this.refreshingAccess = this.api
      .post<LoginResult>(REFRESH_TOKEN_PATH, {
        refresh: this.refreshToken
      })
      .pipe(
        tap(res => {
          this.setTokens(res.access, res.refresh);

          this.refreshingAccess = null;
        }),
        map(res => res.access)
      );

    return this.refreshingAccess;
  }

  load(): Observable<void> {
    const refresh = localStorage.getItem(JWT_STORAGE_KEY);

    if (refresh === null) {
      return of(undefined);
    }

    let expired = true;

    try {
      expired = this.jwtHelper.isTokenExpired(refresh, JWT_EXP_OFFSET);
    } catch {
      localStorage.removeItem(JWT_STORAGE_KEY);
    }

    if (expired) {
      return of(undefined);
    }

    this.refreshToken = refresh;

    return this
      .loadUser()
      .pipe(
        map(() => undefined),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.clearTokens();
            return of(undefined);
          }

          return throwError(() => err);
        }),
      );
  }

  login(creds: LoginCredentials): Observable<User> {
    return this.api
      .post<LoginResult>(LOGIN_PATH, creds)
      .pipe(
        tap(res => this.setTokens(res.access, res.refresh)),
        switchMap(() => this.loadUser())
      );
  }

  logout(): void {
    this.userSubject.next(null);

    this.clearTokens();

    this.router.navigateByUrl('/acceder');
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  hasPerm(perm: string): boolean {
    return this.userSubject.value?.hasPerm(perm) || false;
  }

}
