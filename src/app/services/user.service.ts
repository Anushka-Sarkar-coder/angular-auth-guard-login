import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/users';
  // Save single row
  saveUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Save multiple rows
  saveUsers(data: any[]): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Update a user
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Delete a user
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
