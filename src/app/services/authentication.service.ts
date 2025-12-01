import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:3000';
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasStoredLogin());

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/signup`);
  }
  loginUser(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  // ------- auth state helpers -------
  // Called after successful login
  setLogin(user?: any) {
    localStorage.setItem('isLoggedIn', 'true');
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.loggedIn$.next(true);
  }

  // Called on logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    this.loggedIn$.next(false);
  }

  // synchronous check
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // reactive observable (optional)
  getLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  private hasStoredLogin(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
