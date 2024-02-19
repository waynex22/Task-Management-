import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../evironments/evironment.prod';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl
constructor(private http: HttpClient){}
  getUser(): Observable<any>{
    const endPoin: String  = 'account'
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  getUserById(id: string): Observable<any>{
    const endPoin: String  = `account/${id}`
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  addUser(account: any): Observable<any>{
    const endPoin: String  = 'account/add'
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}${endPoin}`, account , {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  updateUser(account: any): Observable<any>{
    const endPoin: String  = 'account/update'
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put(`${this.apiUrl}${endPoin}/${account._id}`, account , {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}

export interface User {
    _id: string,
    name: string,
    address: string,
    email: string,
    image_url: string,
    pass: string,
    createdAt: Date,
    updatedAt: Date,
    role: string,
    department: string,
    status: string,
    iat: number,
    exp: number,
  }
  