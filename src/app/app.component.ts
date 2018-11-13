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
  title = 'socialLogin-ng';
  isLogin : Boolean;
  token : String = '';
  loading: any;
  constructor(private jwtService : JwtService,
              private apiService : ApiService,
              private router: Router){
    this.loading = true;
  }

  ngAfterViewInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }
        else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          this.loading = false;
        }
      });
  }

  ngOnInit() {
    this.apiService.getIsLoginValue().subscribe(
      isLoginData=>{
        this.isLogin = isLoginData;
      },
      err=>{
        console.log(err);
      }
    )
    // this.token = this.jwtService.getToken();
    // if(this.token == null){
    //   this.isLogin = false;
    // }
    // else{
    //   this.isLogin = true;
    // }
  }

}
