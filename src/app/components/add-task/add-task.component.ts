import { Component, EventEmitter, Output , Input, OnChanges} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../service/TaskService/task.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../service/AlertService/alert.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnChanges{
  @Input() projectId: string | any;
  @Output() closeModalEvent = new EventEmitter<void>();
  task: any = {
    project_id: '',
    account_id: '',
    name: '',
    dead_line: Date,
    description: '',
  };
  project = {} as Project;
  userId: string = '';
  members: any[] = [];
  constructor(private taskService: TaskService, private authService: AuthService, private projectService: ProjectService, private router: Router, private alertService: AlertService) {
    this.getUserId();
  }
  ngOnChanges() {
    if (this.projectId) {
      this.task.project_id = this.projectId;
      this.getProjectById(this.projectId);
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
  onSubmit(): void {
    this.taskService.newTask(this.task).subscribe(
      (response) => {
        this.alertService.changeMessage('Add task successfully');
        this.closeModal();
      }
    );
  }
  getUserId(){
    this.authService.getUserId().subscribe((id: any) => {
      // console.log(id);
      return this.userId = id;
    })  
    // this.getProjectById(this.projectId);
  }
  getProjectById(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (response) => {
        this.project = response.data;
        if (this.project) {
          this.getMember();
        }
      }
    );
  }
  getMember(){
    this.members = this.project.members;
  }
}
