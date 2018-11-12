import { Component, OnInit } from '@angular/core';
import { JwtService } from './core/services/jwt.service';
import { ApiService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialLogin-ng';
  isLogin : Boolean;
  token : String = '';
  constructor(private jwtService : JwtService,
              private apiService : ApiService){}

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
