import { Component } from '@angular/core';
import { Project, ProjectService } from '../../service/ProjectService/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormGroup,FormBuilder,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../service/AlertService/alert.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, ReactiveFormsModule,],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
myForm: FormGroup;
projectId: string | null = null;
project = {} as Project | any;
constructor(private projectService: ProjectService, private route: ActivatedRoute,private formBuilder : FormBuilder, private alertService: AlertService) { 
  this.myForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    expense: [0, [Validators.required, Validators.min(0)]],
    image: ['', [Validators.required]],
    sub_description: ['', [Validators.required]],
    description: ['', [Validators.required]],
    start_time: ['', [Validators.required]],
    end_time: ['', [Validators.required]]
  })
}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    const project_id = params['_id'];
    this.projectId = project_id;
    if (this.projectId !== null) {
      this.getProjectById(this.projectId)
    }
  });
}
  getProjectById(id: string) {
    this.projectService.getProjectById(id).subscribe(res => {
      this.project = res.data;
    })
  }
  onSubmit(): void {
    if(this.myForm.valid){
    this.projectService.updateProject(this.project).subscribe(res => {
      // console.log(res);
      this.alertService.changeMessage('Update project successfully');
    })
  }
  }
}
