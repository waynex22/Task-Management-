import { Component,OnInit } from '@angular/core';
import { ProjectService } from '../../service/ProjectService/project.service';
import { RouterLink } from '@angular/router';
import { Project } from '../../service/ProjectService/project.service';
import { AuthService } from '../../service/AuthService/auth.service';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../service/SharedService/shared.service';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  projects: Project[] = [];
  countProjectProcessing: Number = 0;
  countProjectCompleted: Number = 0;
  completedTasks: any = 6;
  totalTasks: any = 10;
  role: string = '';
  account_id: string = '';
  constructor( private projectService: ProjectService, private authService: AuthService, private sharedService: SharedService, private router: Router) {}
  ngOnInit(): void {
    this.getAllProject()
    this.getRole()
  }
  getAllProject() {
    this.authService.getRole().subscribe(role => {
      this.projectService.getProject().subscribe(
        (response) => {
          let listProjects = response;
          const accountId: any = this.authService.getUserId();
          // console.log(role,accountId.source._value);
          this.account_id = accountId.source._value;
          if (role === 'Manager') {
            this.projects = listProjects;
          } else if (role === 'Leader') {    
            this.projects = listProjects.filter((project: Project) => project.status === 'Unconfirmed' || project.leader === accountId.source._value);
          } else if (role === 'Employee') {
            this.projects = listProjects.filter((project: Project) => project.members.includes(accountId.source._value));
          }
          this.getCountProjectProcessing(this.projects);
          this.getCountProjectCompleted(this.projects);
          // console.log(this.projects);
        }
       
        
      )
    });
  }
  activeProject(account_id: string, project_id: string): any {
    this.projectService.activeProject(account_id, project_id).subscribe(
      (response) => {
        this.getAllProject();
      }
    );
  }
  getRole(){
    this.authService.getRole().subscribe((role: any) => {
      return this.role = role;
    })
  }
  getCountProjectProcessing(projects: Project[]) {
    const arrProjectProcessing = projects.filter(item => item.status === "Processing");
    this.countProjectProcessing = arrProjectProcessing.length;
  }
  getCountProjectCompleted(projects: Project[]) {
    const arrProjectCompleted = projects.filter(item => item.status === "Complete");
    this.countProjectCompleted = arrProjectCompleted.length;
  }
  goToManager(projectId: string) {
    this.sharedService.changeProjectId(projectId);
    this.router.navigate(['/manager-project']);
  }
  getRemainingDays(endTime: Date): number {
    const endDate = new Date(endTime);
    const currentDate = new Date();
    const diffInMs = endDate.getTime() - currentDate.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }
}
