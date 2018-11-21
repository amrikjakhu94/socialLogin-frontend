import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token : String;
  constructor(private http : HttpClient,
              private jwtService : JwtService) { }

  private profile = new BehaviorSubject<any>(true);
  public myprofile = this.profile.asObservable();

  getIsLoginValue(): Observable<any> {
    return this.profile.asObservable();
  }

  sendIsLoginValue(data) {
    this.profile.next(data);
  }

  gethttpOptions(){
    let token = this.jwtService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };
    return httpOptions;
  }

  imageUploadRequest(image : Object):Observable<any>{
    let httpOptions = this.gethttpOptions();
    return this.http.post('http://localhost:3000/postimage',image, httpOptions);
  }

  getMyProfile(){
    let httpOptions = this.gethttpOptions();
    return this.http.get('http://localhost:3000/myprofile',httpOptions);
    // return this.http.post('https://stormy-ravine-20860.herokuapp.com/myprofile',httpOptions);
  }

  setNewPasswordRequest(setNewPassword : Object):Observable<any>{
    return this.http.post('http://localhost:3000/postsetnewpassword',setNewPassword);
  }

  setNewPassword(paramsValue : Object):Observable<any>{
    return this.http.post('http://localhost:3000/setnewpassword',paramsValue);
  }

  signInRequest(signIn : Object):Observable<any>{
    // console.log('Entered signIn request in apiService');
    return this.http.post('http://localhost:3000/signin',signIn);
    // return this.http.post('https://stormy-ravine-20860.herokuapp.com/signin',signIn);
  }

  socialSignInRequest(socialSignIn : Object):Observable<any>{
    console.log('Entered signIn request in apiService');
    return this.http.post('http://localhost:3000/socialsignin',socialSignIn);
    // return this.http.post('https://stormy-ravine-20860.herokuapp.com/signin',signIn);
  }

  signUpRequest(signUp : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/signup',signUp);
    // return this.http.post('https://stormy-ravine-20860.herokuapp.com/signup',signUp);
  }

  isAuthenticated(){
    this.token = this.jwtService.getToken();
    return this.token != null;
  }

  forgotPasswordRequest(forgotPassword : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/forgotpassword',forgotPassword);
    // return this.http.post('https://stormy-ravine-20860.herokuapp.com/forgotpassword',forgotPassword);
  }

}
