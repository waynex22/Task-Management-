import { Component, EventEmitter, Output , Input, OnChanges, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../service/TaskService/task.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AlertService } from '../../service/AlertService/alert.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-swap-task',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf,MatSelectModule],
  templateUrl: './modal-swap-task.component.html',
  styleUrl: './modal-swap-task.component.css'
})
export class ModalSwapTaskComponent implements OnInit{
  @Input() taskId: string | any;
  @Input() projectId: string | any;
  @Input() oldEmployeeId: string | any;
  @Output() closeModalEvent = new EventEmitter<void>();
  data: any = {
    taskId: '',
    projectId: '',
    oldEmployeeId: '',
    newEmployeeId: '',
  };
  listMember: any = [];
  task = {} as Task | any;
  constructor(private taskService: TaskService, private authService: AuthService, private projectService: ProjectService, private router: Router, private alertService: AlertService) {
  }
  ngOnInit(): void {
    this.getProjectById(this.projectId);
    if(this.taskId){
      this.getTaskById(this.taskId);
    }
  }
  getProjectById(id: string) {
    this.projectService.getProjectById(id).subscribe(
      (response) => {
        let project = response.data;
        // console.log(project);
        if(project){
          this.listMember = project.members.filter((member: any) => member._id !== this.oldEmployeeId);
          // console.log(this.listMember);
        }
      }
    );
  }
  getTaskById(id: string) {
    this.taskService.getTaskByIdAndPopulate(id).subscribe(
      (response) => {
        this.task = response.data;
        // console.log(this.task);
      }
    );
  }
  closeModal() {
    this.closeModalEvent.emit();
  }
  onSubmit(): void {
    this.data = {
      taskId: this.taskId,
      projectId: this.projectId,
      oldEmployeeId: this.oldEmployeeId,
      newEmployeeId: this.data.newEmployeeId,
    }
    this.taskService.swapTask(this.data).subscribe(
      (response) => {
        if (response.message) {
          this.closeModal();
          this.alertService.changeMessage(response.message);
        }else {
          this.closeModal();
          this.alertService.changeMessage(response.error);
          
        }
      }
    );
  }

}
