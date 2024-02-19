import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../evironments/evironment.prod';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProject(): Observable<any>{
    const endPoin: string = 'project';
    return this.http.get(`${this.apiUrl}${endPoin}`).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  updateProject(data: { _id: string, name: string; expense: string,description: string, start_time: Date, end_time: Date  }): Observable<any>{
    const endPoin: string = 'project/update';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}${endPoin}/${data._id}`, data, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  getProjectById(_id: string): Observable<any>{
    const endPoin: string = 'project';
    return this.http.get(`${this.apiUrl}${endPoin}/${_id}`).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  newProject(data: { name: string; expense: string,description: string, start_time: Date, end_time: Date  }): Observable<any>{
    const endPoin: string = 'project/add';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}`, data, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  activeProject(account_id: string, project_id: string): Observable<any>{
    const endPoin: string = 'project/active';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}`, {account_id, project_id}, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  completeProject(project_id: string): Observable<any>{
    const endPoin: string = 'project/complete/';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}${project_id}`, {project_id}, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  addMemberToProject(project_id: string, account_id: string): Observable<any>{
    const endPoin: string = 'project/addMember';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}${endPoin}`, {project_id, account_id}, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  getProjectsByMemberId(account_id: string): Observable<any>{
    const endPoin: string = 'project/member/';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}${endPoin}${account_id}`, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  getProjectsPopulate(): Observable<any>{
    const endPoin: string = 'project/populate';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}${endPoin}`, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
  kickMember(project_id: string, account_id: string): Observable<any>{
    const endPoin: string = 'project/kickMember';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}${endPoin}`, {project_id, account_id}, {headers}).pipe(catchError((error: 
      HttpErrorResponse) => {
        return throwError(error)
      }));
  }
}
export interface Project {
  _id: string;
  name: string;
  expense: number;
  description: string;
  leader: string;
  image: string;
  sub_description: string;
  members: string[];
  status: string;
  total_task: number;
  start_time: Date;
  end_time: Date;
  createdAt: Date;
  updatedAt: Date;
}