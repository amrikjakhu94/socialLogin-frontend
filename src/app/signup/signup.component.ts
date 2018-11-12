import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  signUpDetails: Object;

  constructor(private fb : FormBuilder,
              private apiService : ApiService) { 
    this.signUpForm = fb.group({
      name : ['',Validators.compose([
        Validators.required
      ])],
      email : ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])],
      password : ['',Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      confirmpassword : ['',Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmpassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit(){
    this.signUpDetails = this.signUpForm.value;
    console.log(this.signUpForm.value);
    this.apiService.signUpRequest(this.signUpDetails).subscribe(
      signup=>{
        if(signup){
          console.log(signup);
        }
        else{
          console.log('User already exists...');
        }
      }
    )
    this.signUpForm.reset();
  }

  ngOnInit() {
  }

}
