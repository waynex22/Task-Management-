import { Component } from '@angular/core';
import { TaskService } from '../../service/TaskService/task.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../service/AlertService/alert.service';
import { ModalSwapTaskComponent } from '../modal-swap-task/modal-swap-task.component';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf,RouterLink, CommonModule, ModalSwapTaskComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  tasks: any[] = [];
  projects: Project[] = [];
  role: string = '';
  account_id: string = ''; 
  totalTaskProcessing : number = 0; 
  totalTaskDone : number = 0;
  totalTaskWaitConfirmed : number = 0;
  openSwapModal: boolean = false;
constructor( private taskService : TaskService , private authService: AuthService, private projectService: ProjectService, private alertService: AlertService) {}
  ngOnInit(): void {
    this.getRole();
    this.getUserId();
  }
  getRole(){
    this.authService.getRole().subscribe((role: any) => {
      // console.log(role);
      return this.role = role;
    })
  }
  getUserId(){
    this.authService.getUserId().subscribe((id: any) => {
      // console.log(id);
      return this.account_id = id;
    })
    this.getAllProject();
  }
  getAllProject() {
    this.authService.getRole().subscribe(role => {
      this.projectService.getProject().subscribe(
        (response) => {
         this.projects = response.filter((project: Project) => project.leader === this.account_id);
        //  console.log(this.projects);
        this.getAllTask();
        }
      )
    });
  }
  getCountTaskProcessing(tasks: any){
    const arr = tasks.filter((task: any) => task.status === 'Processing')
    this.totalTaskProcessing = arr.length
  }
  getCountTaskDone(tasks: any){
    const arr = tasks.filter((task: any) => task.status === 'Complete')
    this.totalTaskDone = arr.length
  }
  getCountTaskWaitConfirmed(tasks: any){
    const arr = tasks.filter((task: any) => task.status === 'Wait to Confirmed')
    this.totalTaskWaitConfirmed = arr.length
  }
  getAllTask(){
    this.taskService.getAllTasks().subscribe(
      (response: any) => {
        let listTasks = response.data;
        // console.log(listTasks);
        
        if(this.role === 'Leader'){
          this.tasks = listTasks.filter((task: any) =>
          task.project_id.leader === this.account_id);
        }else if(this.role === 'Employee'){
          this.tasks = listTasks.filter((task: any) =>
          task.account_id &&
          task.account_id._id === this.account_id);
        } else if(this.role === 'Manager'){
          this.tasks = listTasks;
        }
        console.log(this.tasks);
        
        this.getCountTaskProcessing(this.tasks)
        this.getCountTaskDone(this.tasks)
        this.getCountTaskWaitConfirmed(this.tasks)
      })
  }
  leaderTaskConfirm(id: string){
    this.taskService.leaderConfirmTask(id).subscribe(
      (response) => {
        if(response.message){
          this.alertService.changeMessage(response.message);
        this.getAllTask();
      }else{
        this.alertService.changeMessage(response.error);
      }
      }
    )
  }
  openModalSwapTask(){
    this.openSwapModal = true;
  }
  closeModalSwapTask(){
    this.openSwapModal = false;
  }
}
