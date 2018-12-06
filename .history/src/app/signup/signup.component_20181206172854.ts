import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from '../core/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpDetails: Object;
  signupSpinner = false;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private toasterService: ToasterService,
              private router: Router) {
    this.signUpForm = fb.group({
      name : ['', Validators.compose([
        Validators.required
      ])],
      email : ['', Validators.compose([
        Validators.required,
        // tslint:disable-next-line:max-line-length
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
      ])],
      password : ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      confirmpassword : ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmpassword').value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    this.signupSpinner = true;
    this.signUpDetails = this.signUpForm.value;
    // console.log(this.signUpForm.value);
    this.apiService.signUpRequest(this.signUpDetails).subscribe(
      signup => {
        if (signup) {
          console.log(signup);
          this.signupSpinner = false;
          this.toasterService.showSuccess(signup.success, 'Success');
          this.router.navigate(['/']);
        }
      },
      error => {
        this.signupSpinner = false;
        this.toasterService.showError(error.error.error, 'Error');
      }
    );
    // this.signUpForm.reset();
  }

  ngOnInit() {
  }

}
