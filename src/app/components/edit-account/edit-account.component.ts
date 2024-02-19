import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../service/UserService/user.service';
import { FormGroup,FormBuilder,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { AlertService } from '../../service/AlertService/alert.service';
@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.css'
})
export class EditAccountComponent {
  myForm: FormGroup;
  accountId: string | null = null;
  account = {} as User;
  constructor(private route: ActivatedRoute, private accountService: UserService,private formBuilder : FormBuilder, private alertService: AlertService) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      image_url: ['', [Validators.required]],
      department: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
   }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const _id = params['_id'];
      this.accountId = _id;
      if (this.accountId !== null) {
        this.getUserById(this.accountId)
      }
    });
  }
  getUserById(id: string) {
    this.accountService.getUserById(id).subscribe(res => {
      this.account = res;
      // console.log(this.account);
    })
  }
  onSubmit() {
   if(this.myForm.valid){
    this.accountService.updateUser(this.account).subscribe(res => {
      if(res.message){
        this.alertService.changeMessage(res.message)
      }else{
        this.alertService.changeMessage(res.error)
      }
    })
   }
  }
}
