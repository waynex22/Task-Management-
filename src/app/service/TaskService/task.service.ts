import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../evironments/evironment.prod';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }
  getAllTasks(): Observable<any> {
    const endPoin = 'task'
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  getTaskByIdAndPopulate(id: string): Observable<any> {
    const endPoin = `task/populate/${id}`
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  getTaskById(id: string): Observable<any> {
    const endPoin = `task/${id}`
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  getTaskByLeader(leader_id: string): Observable<any> {
    const endPoin = `task/leader/`
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}${endPoin}${leader_id}`, { headers }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  newTask(task: any): Observable<any> {
    const endPoin = 'task/add'
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}`, task, { headers }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  completeTask(id: string): Observable<any> {
    const endPoin = `task/send/`
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}${endPoin}${id}`, { headers }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  leaderConfirmTask(id: string): Observable<any> {
    const endPoin = `task/complete/`
    const token = localStorage.getItem('token');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}${endPoin}${id}`, { headers }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  getTaskByProject(project_id: string): Observable<any> {
    const endPoin = `task/project/`
    return this.http.get(`${this.apiUrl}${endPoin}${project_id}`).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
  swapTask(data: any): Observable<any> {
    const endPoin = 'task/swap'
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}`, data, { headers }).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(error)
    }));
  }
}
export interface Task {
  _id: string;
  account_id: string;
  project_id: string;
  leader_id: string;
  name: string;
  dead_line: string;
  description: string;
  status: string;
}