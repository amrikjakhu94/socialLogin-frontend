import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { ApiService } from './core/services/api.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
  }

  ngOnInit() {

  }

}
