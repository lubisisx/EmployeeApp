import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5000';
  private isAuthenticated = false;
  private role = '';

  constructor(private http: HttpClient) {}

  register(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, employee);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    // Ideally, you would decode the JWT token and extract the role from it.
    // Here, we assume the role is stored in local storage for simplicity.
    return localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuthenticated = false;
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
    this.role = role;
  }

  getDecodedToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
