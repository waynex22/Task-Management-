import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private projectIdSource = new BehaviorSubject<string | null>(null);
  currentProjectId = this.projectIdSource.asObservable();

  constructor() { }

  changeProjectId(projectId: string) {
    this.projectIdSource.next(projectId);
    localStorage.setItem('projectId', projectId);
  }
}