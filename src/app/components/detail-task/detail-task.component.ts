import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskService } from '../../service/TaskService/task.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/AuthService/auth.service';
import { AlertService } from '../../service/AlertService/alert.service';
@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent {
  taskId: string | null = null;
  task = {} as Task | any;
  account_id: string = '';
  constructor(private route: ActivatedRoute, private taskService: TaskService, private authService: AuthService, private alertSerivce: AlertService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const task_id = params['_id'];
      this.taskId = task_id;
      if (this.taskId !== null) {
        this.getTaskByIdAndPopulate(this.taskId)
      }
    });
  }
  getTaskByIdAndPopulate(id: string) {
    this.taskService.getTaskByIdAndPopulate(id).subscribe(res => {
      this.task = res.data;
      // console.log(this.task);
    })
  }
  completeTask(id: any) {
    if (id !== null) {
      this.taskService.completeTask(id).subscribe(
        (response) => {
          if (response.message) {
            this.alertSerivce.changeMessage(response.message)
            this.getTaskByIdAndPopulate(id)
          }
          else{
            this.alertSerivce.changeMessage(response.error)
            this.getTaskByIdAndPopulate(id)
          }
        })
    }
  }
}