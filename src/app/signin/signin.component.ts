import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'ng-social';
import { ApiService } from '../core/services/api.service';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { ToasterService } from '../core/services/toaster.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  title = 'socialLogin-ng';
  signInForm : FormGroup;
  signInDetails : Object;
  token: string;
  isLogin: boolean;
  loginSpinner : boolean = false;

  constructor(private socialAuthService : SocialAuthService,
              private fb : FormBuilder,
              private apiService : ApiService,
              private jwtService : JwtService,
              private router : Router,
              private toasterService : ToasterService) {
    this.signInForm = fb.group({
      email : ['',Validators.compose([
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
              ])],
      password : ['',Validators.compose([
                  Validators.required,
                  Validators.minLength(4)
                  ])]
    });
  }

  onSubmit(){
    this.loginSpinner = true;
    this.signInDetails = this.signInForm.value;
    this.apiService.signInRequest(this.signInDetails).subscribe(
      signin=>{
        if(signin){
          console.log(signin,' after subscribe response');
          this.jwtService.saveToken(signin.token);
          this.apiService.sendIsLoginValue(false);
          this.router.navigate(['/dashboard']);
          //console.log(signin.token);
          this.loginSpinner = false;
        }
        else{
          console.log('Error in signIn...')
        }
      },
      error=>{
        console.log(error.error,'ppppppppppp');
        this.toasterService.showError(error.error.auth,'Account not verified');
        this.loginSpinner = false;
      }
    )
    this.signInForm.reset();
  }

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  public socialLogin(platform: string) {
    let socialPlatformProvider;

    if(platform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(platform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      //console.log(platform + " login in data : " , userData);
      this.signInDetails = userData;
      console.log(this.signInDetails);
      this.apiService.signInRequest(this.signInDetails).subscribe(
        signin=>{
          console.log(signin);
        }
      )
    });

  }

  ngOnInit() {
    this.token = this.jwtService.getToken();
    if(this.token == null){
      this.isLogin = false;

    }
    else{
      this.isLogin = true;
    }
  }

}
