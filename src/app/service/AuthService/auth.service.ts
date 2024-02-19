import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, of, map } from 'rxjs';
import { environment } from '../../evironments/evironment.prod';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role = new BehaviorSubject<string | null>(null);
  private userId = new BehaviorSubject<string | null>(null);
  private roles: string[] = [];
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }
  login(credentials: { email: string; password: string }): Observable<HttpResponse<any>> {
    const endPoint = 'account/login';
    return this.http.post<any>(`${this.apiUrl}${endPoint}`, credentials, { observe: 'response' })
      .pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
  }
  changePassword(data: { token: string; password: string; newPassword: string }): Observable<any> {
    const endPoint = 'account/changePassword';
    return this.http.post<any>(`${this.apiUrl}${endPoint}`, data);
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setRole(role: string | null): void {
    this.role.next(role);
  }
  getRole(): Observable<string | null> {
    return this.role.asObservable();
  }
  setUserId(userId: string | null): void {
    this.userId.next(userId);
  }
  getUserId(): Observable<string | null> {
    return this.userId.asObservable();
  }
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
  getUserByToken(token: string): Observable<any> {
    const endPoin = 'account/user';
    return this.http.post(`${this.apiUrl}${endPoin}`, { token });
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
      return this.getUserByToken(token).pipe(
        map((response: any) => {
          if(response.data){
            return true;
          }
          return false;
        }),
        catchError(() => of(false)) 
      );
    } else {
      return of(false);
    }
  }
  setRoles(roles: string[]): void {
    this.roles = roles;
  }
  hasRoles(requiredRoles: string[]): boolean {
    return requiredRoles.every(role => this.roles.includes(role));
  }
}