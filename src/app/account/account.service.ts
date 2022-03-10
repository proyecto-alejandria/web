import { Injectable } from '@angular/core';
import { ApiService } from 'api/api.service';
import { UserCard } from 'auth/user.model';
import { Observable } from 'rxjs';

const REGISTER_PATH = '/users/';
const ACTIVATION_PATH = '/users/activation/';

export interface RegisterData {

  first_name: string;

  last_name: string;

  email: string;

  password: string;

};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private api: ApiService,
  ) { }

  register(data: RegisterData): Observable<UserCard> {
    return this.api.post<UserCard>(REGISTER_PATH, data);
  }

  activate(uid: string, token: string): Observable<void> {
    return this.api.post(ACTIVATION_PATH, { uid, token });
  }

}
