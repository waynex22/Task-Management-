import { Component } from '@angular/core';
import { ProjectService } from '../../service/ProjectService/project.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertService } from '../../service/AlertService/alert.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent {
  myForm: FormGroup;
  project: any = {  
    name: '',
    expense: null,
    sub_description: '',
    image: '',
    description: '',
    start_time: new Date() ,
    end_time: new Date(),
  };

  constructor(private projectService: ProjectService, private router: Router, private formBuilder : FormBuilder, private alertService: AlertService) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      expense: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
      sub_description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]]
    },{validator: this.dateLessThan('start_time', 'end_time')});
  }
   dateLessThan(startKey: string, endKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let start = group.controls[startKey];
      let end = group.controls[endKey];
      if (start.value > end.value) {
        return {
          dates: "Start date should be less than end date"
        };
      }
      return {};
    }
  }
  onSubmit(): void {
    if(this.myForm.valid){
    this.projectService.newProject(this.project).subscribe(
      (response) => {
        this.alertService.changeMessage('Add project successfully');
        setTimeout(() => {
          this.router.navigate(['/project']);
        }, 1500);
      }
    );
  }
  }
}
