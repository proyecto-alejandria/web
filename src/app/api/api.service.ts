import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  get<T>(path: string, params = new HttpParams()): Observable<T> {
    return this.http.get<T>(environment.apiUrl + path, { params });
  }

  patch<T>(path: string, data: Object = {}): Observable<T> {
    return this.http.patch<T>(environment.apiUrl + path, data);
  }

  post<T>(path: string, data: Object = {}): Observable<T> {
    return this.http.post<T>(environment.apiUrl + path, data);
  }

  put<T>(path: string, data: Object = {}): Observable<T> {
    return this.http.put<T>(environment.apiUrl + path, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + path);
  }

}
