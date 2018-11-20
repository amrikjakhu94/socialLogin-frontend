import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'socialLogin-ng';
  isLogin : Boolean;
  
  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.getIsLoginValue().subscribe(
      isLoginData=>{
        this.isLogin = isLoginData['isLogin'];
      },
      err=>{
        console.log(err);
      }
    )
  }

}
