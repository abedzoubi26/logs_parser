import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = environment.endpoint;
  currentUser = {};
  errors: any = {};
  token: any = null;
  constructor(private http: HttpClient, public router: Router, public cookie: CookieService) {


  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/register`;
    return this.http.post(api, user);
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/login`, user);
  }

  getToken() {
    // return this.token;

    return this.cookie.getCookie('access_token');
  }
  setToken(token: any = null) {
    this.token = token;
  }

  get isLoggedIn(): boolean {
    let authToken = this.cookie.getCookie('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    this.setToken()
    let removeToken = this.cookie.deleteCookie('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/auth/me`;

    return this.http.get(api).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    // this.errors = error;
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => msg);
  }
}
