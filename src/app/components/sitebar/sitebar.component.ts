import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sitebar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sitebar.component.html',
  styleUrl: './sitebar.component.css'
})
export class SitebarComponent {
  role: string = '';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.getRole();
  }
  getRole(){
    this.authService.getRole().subscribe((role: any) => {
      return this.role = role;
    })
    // console.log(this.role);
  }

}
