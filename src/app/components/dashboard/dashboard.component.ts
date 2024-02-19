import { Component , OnInit} from '@angular/core';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { User, UserService } from '../../service/UserService/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/AuthService/auth.service';
import { TaskService } from '../../service/TaskService/task.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  projects: Project[] = [];
  users: User[] = [];
  totalTp: number = 0;
  role: string = '';
  totalTask: number = 0;
  accountId: string | null = null;
  constructor(private projectService: ProjectService, private userService: UserService, private authService: AuthService, private taskSerivce : TaskService) { }
  ngOnInit(): void {
    this.getAllProject();
    this.getAllUser();
    this.getRole();
    this.getAccountId();
    this.getTask();
  }
  getAllProject() {
    this.projectService.getProject().subscribe(
      (response) => {
        let listProjects = response;
        if(this.role == 'Manager'){
          this.projects = listProjects
          const arr = listProjects.filter((project: any) => project.status === 'Complete')
          this.totalTp = arr.reduce((total: number, project: any) => total + project.expense, 0);
        }else if(this.role === 'Leader'){
          this.projects = listProjects.filter((project : any) => project.leader == this.accountId)
          const arr = listProjects.filter((project: any) => project.status === 'Complete')
          this.totalTp = arr.reduce((total: number, project: any) => total + project.expense, 0);
        }else{
          if(this.accountId){
            this.projects = listProjects.filter((project: any) => project.members.includes(this.accountId));
            const arr = listProjects.filter((project: any) => project.status === 'Complete');
            this.totalTp = arr.reduce((total: number, project: any) => total + project.expense, 0);
          }
        }
      }
    )
    // console.log(this.projects);
  }
  getTask(){
    this.taskSerivce.getAllTasks().subscribe((response) => {
      let arr = response.data
      this.totalTask = arr.length;
    })
  }
  getAllUser(){
    this.userService.getUser().subscribe(
      (response) => {
        this.users = response
      }
    )
  }
  getRole(){
    this.authService.getRole().subscribe((role: any) => {
      this.role = role;
    });
  }
  getAccountId(){
    this.authService.getUserId().subscribe((id: any) => {
      this.accountId = id;
    }
    )
  }
}
