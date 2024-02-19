import { Component } from '@angular/core';
import { AuthService } from '../../service/AuthService/auth.service';
import { Router } from '@angular/router';
import { User } from '../../service/UserService/user.service';
import { ModalChangePassComponent } from '../modal-change-pass/modal-change-pass.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NavComponent,ModalChangePassComponent , NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  user: User = {} as User;
  token: string | null = null;
  isModalOpen = false;
  constructor(private authService: AuthService, private router: Router) { 
    this.token = this.authService.getToken();
    if (this.token !== null) {
      this.authService.getUserByToken(this.token).subscribe(
        (data) => {
          this.user = data.data
          this.authService.setRoles(data.data.role);
          this.authService.setUserId(data.data.id);
          this.authService.setRole(data.data.role);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
