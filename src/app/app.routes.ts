import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './GuardAuthention/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefautlLayoutComponent } from './layouts/defautl-layout/defautl-layout.component';
import { TaskComponent } from './components/task/task.component';
import { ProjectComponent } from './components/project/project.component';
import { MemberComponent } from './components/member/member.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ManagerProjectComponent } from './components/manager-project/manager-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { DetailTaskComponent } from './components/detail-task/detail-task.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { RoleGuardService } from './GuardAuthention/role-guard.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { DetailProjectComponent } from './components/detail-project/detail-project.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
    {path : '', redirectTo:'/dashboard' , pathMatch: 'full'},
    {path: '', component: DefautlLayoutComponent,canActivate: [AuthGuard], children: [
        {
            path: 'home', component: HomeComponent
        },
        {
            path: 'dashboard', component: DashboardComponent 
        },
        {
            path: 'project', component: ProjectComponent
        },
        {
            path: 'project/:_id', component: DetailProjectComponent
        },
        {
            path: 'add-project' , component: AddProjectComponent ,canActivate: [RoleGuardService],
            data: { requiredRoles: ['Manager'] }
        },
        {
            path: 'project/manager-project/:_id', component: ManagerProjectComponent
        },
        {
            path: 'project/editProject/:_id', component: EditProjectComponent
        },
        {
            path: 'task' , component: TaskComponent 
        },
        {
            path: 'task/detail-task/:_id' , component: DetailTaskComponent
        },
        {
            path: 'add-task' , component: AddTaskComponent, canActivate: [RoleGuardService],
            data: { requiredRoles: ['Leader'] }
        },
        {
            path: 'member' , component: MemberComponent 
        },
        {
            path: 'add-account', component: AddAccountComponent, 
            canActivate: [RoleGuardService],
            data: { requiredRoles: ['Manager'] }
        },
        {
            path: 'edit-account/:_id', component: EditAccountComponent, 
            canActivate: [RoleGuardService],
            data: { requiredRoles: ['Manager'] }
        }
    ] },
    {path: 'login', component: LoginComponent},
    {path: 'unauthorized', component: UnauthorizedComponent}
];
    