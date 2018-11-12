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

  private subject = new BehaviorSubject<any>(true);

  public mysubject = this.subject.asObservable();

  getIsLoginValue(): Observable<any> {
    return this.subject.asObservable();
  }

  sendIsLoginValue(data) {
    this.subject.next(data);
  }

  signInRequest(signIn : Object):Observable<any>{
    console.log('Entered signIn request in apiService');
    return this.http.post('http://localhost:3000/signin',signIn);
  }

  signUpRequest(signUp : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/signup',signUp);
  }

  isAuthenticated(){
    this.token = this.jwtService.getToken();
    return this.token != null;
  }

  forgotPasswordRequest(forgotPassword : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/forgotpassword',forgotPassword);
  }

}
