import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/AuthService/auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-modal-change-pass',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './modal-change-pass.component.html',
  styleUrl: './modal-change-pass.component.css'
})
export class ModalChangePassComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  myForm: FormGroup;
  data = {
    token: '',
    password: '',
    newPassword: '',
  };
  token: any;
  constructor(private authService: AuthService,private formBuilder: FormBuilder) {
    this.token = this.authService.getToken();
    this.myForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      this.data = {
        token: this.token,
        password: this.myForm.value.password,
        newPassword: this.myForm.value.newPassword
      };
      this.authService.changePassword(this.data).subscribe(
        (data) => {
          // console.log(data);
          alert('Password changed successfully');
          this.closeModal();
        },
        (error) => {
          console.log(error);
        }
      );
      // console.log(this.data);
      
  }
}
}
