import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup;
  signUpDetails: Object;
  signupSpinner : boolean = false;

  constructor(private fb : FormBuilder,
              private apiService : ApiService,
              private messageService: MessageService,
              private toastrService : ToastrService) { 
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

  showSuccess() {
    this.toastrService.success('New user registered!', 'You can now login with your credentials!');
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmpassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit(){
    this.signupSpinner = true;
    this.signUpDetails = this.signUpForm.value;
    //console.log(this.signUpForm.value);
    this.apiService.signUpRequest(this.signUpDetails).subscribe(
      signup=>{
        if(signup){
          console.log(signup);
          this.signupSpinner = false;
          this.showSuccess();
        }
        else{
          console.log('User already exists...');
          this.signupSpinner = false;
        }
      },
      error=>{
        console.log(error.error,'ooooooooooooooooooooooo');
        this.signupSpinner = false;
        this.showError();
      }
    )
    this.signUpForm.reset();
  }

  ngOnInit() {
  }

}
