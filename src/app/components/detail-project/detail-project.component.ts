import { Component } from '@angular/core';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { AlertService } from '../../service/AlertService/alert.service';
import { Task, TaskService } from '../../service/TaskService/task.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../../service/UserService/user.service';
import { AuthService } from '../../service/AuthService/auth.service';

@Component({
  selector: 'app-detail-project',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './detail-project.component.html',
  styleUrl: './detail-project.component.css'
})
export class DetailProjectComponent {
  projectId: string = '';
  project = {} as Project;
  userId: string | null = null;
  tasks: Task[] | any = [];
  teams: User[] | any = [];
  constructor(private route: ActivatedRoute, private projectService: ProjectService, private alertService: AlertService, private taskService: TaskService, private authService: AuthService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['_id'];
      this.projectId = projectId;
      if (this.projectId) {
        this.getUserId();
        this.getProjectById(this.projectId);
        this.getTaskByProjectId(this.projectId);
      }
    });
  }
  getProjectById(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (response) => {
        this.project = response.data;
        if(this.project){
          this.teams = this.project.members;
        }
      }
    );
  }
  getTaskByProjectId(project_id: string) {
    this.taskService.getTaskByProject(project_id).subscribe(
      (response) => {
        const tasks = response.data;
          this.tasks = tasks.filter((task: any) => task.account_id._id === this.userId);
          // console.log(this.tasks);
      }
    );
  }
  getUserId() {
    this.authService.getUserId().subscribe((id: any) => {
      this.userId = id;
      console.log(this.userId);
    });
  }
  completeTask(id: any) {
    if (id !== null) {
      this.taskService.completeTask(id).subscribe(
        (response) => {
          if (response.message) {
            this.alertService.changeMessage(response.message);
            this.getProjectById(this.projectId);
            this.getTaskByProjectId(this.projectId);
          }
        })
    }
  }
}
