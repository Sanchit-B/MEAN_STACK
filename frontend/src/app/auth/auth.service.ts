import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from './auth.model';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';
  userId = '';

  tokenTimer: any;
  isAuthenticated = false;
  authStatusListner = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  creatUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        this.authStatusListner.next(false);
      });
  }

  refreshJWTToken() {
    const email = jwt_decode(localStorage.getItem('token'))['email'];
    console.log('refreshing token for...');
    console.log(email);

    this.http.get<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/refreshToken', {
      params: new HttpParams().set(
        'email', email
      )
    }).subscribe(res => {
      this.token = res.token;
      if (this.token) {
        this.setAuthTimer(res.expiresIn);
        this.isAuthenticated = true;
        this.authStatusListner.next(true);
        this.userId = res.userId;
        const expirationDate = new Date(Date.now() + res.expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate, this.userId);
        this.router.navigate(['/post-list']);
      }
    },
    err => {
      this.authStatusListner.next(false);
    })
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(res => {
        this.token = res.token;
        if (this.token) {
          this.setAuthTimer(res.expiresIn);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          this.userId = res.userId;
          const expirationDate = new Date(Date.now() + res.expiresIn * 1000);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/post-list']);
        }
      },
      err => {
        this.authStatusListner.next(false);
      });
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.authStatusListner.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.refreshJWTToken();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    console.log(expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }


}
