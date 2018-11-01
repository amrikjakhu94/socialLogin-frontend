import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  signInRequest(signIn : Object):Observable<any>{
    console.log('Entered signIn request in apiService');
    return this.http.post('http://localhost:3000/signin',signIn);
  }

  signUpRequest(signUp : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/signup',signUp);
  }

  forgotPasswordRequest(forgotPassword : Object):Observable<any>{
    console.log('Entered signUp request  in apiService');
    return this.http.post('http://localhost:3000/forgotpassword',forgotPassword);
  }

}
