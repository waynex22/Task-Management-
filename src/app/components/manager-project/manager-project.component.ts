import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { User, UserService } from '../../service/UserService/user.service';
import { AlertService } from '../../service/AlertService/alert.service';
import { Task, TaskService } from '../../service/TaskService/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ModalSwapTaskComponent } from '../modal-swap-task/modal-swap-task.component';
@Component({
  selector: 'app-manager-project',
  standalone: true,
  imports: [CommonModule, NgIf, AddTaskComponent, ModalSwapTaskComponent],
  templateUrl: './manager-project.component.html',
  styleUrl: './manager-project.component.css'
})
export class ManagerProjectComponent implements OnInit {
  openAddTask: boolean = false;
  openSwapTask: boolean = false;
  oldEmployeeId: string = '';
  taskId: string = '';
  projectId: string = '';
  project = {} as Project;
  users: User[] = [];
  status_add_member: boolean = true;
  listMember: User[] | any = [];
  tasks: Task[] | any = [];
  message: string = '';
  errMessage: string = '';
  completedTasks: any = 0;
  constructor(private userService: UserService, private route: ActivatedRoute, private projectService: ProjectService, private alertService: AlertService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['_id'];
      this.projectId = projectId;
      if (this.projectId) {
        this.getProjectById(this.projectId);
        this.getTaskByProjectId(this.projectId);
      }
    });
    // console.log(this.users);
    
  }
  getProjectById(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (response) => {
        this.project = response.data;
        if (this.project) {
          this.listMember = this.project.members;
          this.getListUser();
        }
      }
    );
  }
  getListUser(){
    this.userService.getUser().subscribe(
      (response) => {
        const listIdMember = this.listMember.map((member: User) => member._id);
          this.users = response.filter((user: User) =>  user._id !== listIdMember.find((id: string) => id === user._id) && user.role !== 'Manager' && user.role !== 'Leader' && user.status !== 'Off');
        // console.log(this.users);
      }
    )
  }
  addMemberToProject(account_id: string) {
    if (this.projectId !== null) {
      this.projectService.addMemberToProject(this.projectId, account_id).subscribe(
        (response) => {
          if(response.message){
          this.alertService.changeMessage(response.message);
          this.getProjectById(this.projectId);
        }else{
          this.alertService.changeMessage(response.error);
        }
      }
      );
    }
  }
  completeProject(id: string) {
    if (id !== null) {
      this.projectService.completeProject(id).subscribe(
        (response) => {
          if (response.error) {
            this.errMessage = response.error;
            this.alertService.changeMessage(response.error);
          }else{
            this.message = response.message;
            this.alertService.changeMessage(response.message);
            this.getProjectById(id)
          }
        })
    }
  }
  kickMemberFromProject(project_id: string, account_id: string) {
    if (project_id !== null && account_id !== null) {
      this.projectService.kickMember(project_id, account_id).subscribe(
        (response) => {
          if(response.error){
            this.alertService.changeMessage(response.error);
          }else{
            this.alertService.changeMessage(response.message);
            this.getProjectById(project_id);
          }
        }
      );
    }
  }
  getTaskByProjectId(project_id: string) {
    this.taskService.getTaskByProject(project_id).subscribe(
      (response) => {
        this.tasks = response.data;
       this.completedTasks = this.tasks.filter((task: Task) => task.status === 'Complete').length;
      }
    );
  }
  openAddTaskModal() {
    this.openAddTask = true;
  }
  openSwapTaskModal(taskId: string, oldEmployeeId: string) {
    this.taskId = taskId;
    this.oldEmployeeId = oldEmployeeId;
    this.openSwapTask = true;
  }
  closeSwapTaskModal() {
    this.openSwapTask = false;
    this.getTaskByProjectId(this.projectId);
  }

  closeAddTaskModal() {
    this.openAddTask = false;
    this.getTaskByProjectId(this.projectId);
  }
  confirmSuccessTask(id: string) {
    if (id !== null) {
      this.taskService.leaderConfirmTask(id).subscribe(
        (response) => {
          if (response.error) {
            this.alertService.changeMessage(response.error);
          }else{
            this.alertService.changeMessage(response.message);
            this.getTaskByProjectId(this.projectId);
            this.getTaskByProjectId(this.projectId);
          }
        })
    }
  }
}
