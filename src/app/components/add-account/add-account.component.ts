import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/UserService/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertService } from '../../service/AlertService/alert.service';
@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {
  myForm: FormGroup;
  account : any = {
    name: '',
    email: '',
    password: '',
    address: '',
    image_url:'',
  }
  constructor(private userService: UserService, private router : Router, private formBuilder : FormBuilder, private alertService: AlertService) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      image_url: ['', [Validators.required]],
    });
  }
  onSubmit(): void{
    if(this.myForm.valid){
    this.userService.addUser(this.account).subscribe((data) => {
      this.alertService.changeMessage('Add account successfully')
      setTimeout(() => {
        this.router.navigate(['/member']);
      } , 1500);
    });
  }
  }
}
