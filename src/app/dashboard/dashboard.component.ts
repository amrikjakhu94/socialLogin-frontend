import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { ToasterService } from '../core/services/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private jwtService : JwtService,
              private router : Router,
              private apiService : ApiService,
              private toasterService : ToasterService) { }

  destroyToken(){
    this.jwtService.destroyToken();
    this.router.navigate(['/']);
    this.apiService.sendIsLoginValue(true);
  }

  ngOnInit() {
    //this.apiService.sendIsLoginValue(false);
    this.toasterService.showSuccess('','');
  }

}
