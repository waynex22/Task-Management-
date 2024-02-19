import { Component } from '@angular/core';
import { AuthService } from '../../service/AuthService/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertService } from '../../service/AlertService/alert.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;
  credentials = { email: '', password: '' };
  message: string = '';
  constructor(private authService: AuthService , private router: Router, private formBuilder: FormBuilder, private alertService: AlertService) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.myForm.valid) {
      this.authService.login(this.credentials).subscribe(
        (response) => {
          if (response.status === 200) {
            const token = response.body.token;
            this.authService.setToken(token);
            this.alertService.changeMessage('Login successfully');
            this.router.navigate(['/dashboard']);
          } else if (response.status === 204) {
            this.message = 'Email Not Found';
          } else if (response.status === 208) {
            this.message = 'Password Incorrect';
          }
        },
        (response) => {
          console.error(response.error);
        }
      );
    }
  }
}
