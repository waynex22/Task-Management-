import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { SitebarComponent } from '../../components/sitebar/sitebar.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AlertService } from '../../service/AlertService/alert.service';
import { NgIf } from '@angular/common';
import { HomeComponent } from '../../components/home/home.component';
@Component({
  selector: 'app-defautl-layout',
  standalone: true,
  imports: [NavComponent , SitebarComponent, RouterOutlet, NgIf, HomeComponent],
  templateUrl: './defautl-layout.component.html',
  styleUrl: './defautl-layout.component.css'
})
export class DefautlLayoutComponent implements OnInit{
  alertMessage: string | undefined;
  constructor(private alertService: AlertService) {
  }
  ngOnInit() {
    this.alertService.currentMessage.subscribe((message) => (this.alertMessage = message));
  }
}
