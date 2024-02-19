import { Component } from '@angular/core';
import { User, UserService } from '../../service/UserService/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  users : User[] = [];
  countLeader : number = 0;
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUser().subscribe((data: User[]) => {
      this.users = data.filter((user) => user.role !== 'Manager');
      if(this.users){
        const arr = this.users.filter((user) => user.role === 'Leader');
        this.countLeader = arr.length; 
      }
    });
  }
}
