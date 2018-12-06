import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../core/services/toaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {
  id: String;
  paramValue: any;
  setPassword: Boolean = false;
  setNewPasswordForm: FormGroup;
  setNewPasswordSpinner = false;
  setNewPassword: Object;
  setNewPasswordDetails: Object;

  constructor(private apiService: ApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toasterService: ToasterService,
              private fb: FormBuilder,
              private jwtService: JwtService) {

    this.setNewPasswordForm = fb.group({
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
    this.setNewPasswordSpinner = true;
    this.setNewPassword = this.setNewPasswordForm.value.password;
    this.setNewPasswordDetails = { email : this.paramValue.email , password : this.setNewPassword };
    // console.log(this.setNewPasswordDetails);
    this.apiService.setNewPasswordRequest(this.setNewPasswordDetails).subscribe(
      setnewpassword => {
        if (setnewpassword) {
          console.log(setnewpassword, 'vvvvvvvv');
          this.setNewPasswordSpinner = false;
          this.toasterService.showSuccess('Password changed successfully', 'Success');
          const userDetails = { data : setnewpassword , isLogin : true };
          this.jwtService.saveToken(setnewpassword.token);
          this.apiService.sendIsLoginValue(userDetails);
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.setNewPasswordSpinner = false;
        this.toasterService.showError(error.error.error, 'Error');
      }
    );
    this.setNewPasswordForm.reset();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramValue = params;
    });
    this.apiService.setNewPassword(this.paramValue).subscribe(
      res => {
        if (res) {
          console.log(res);
          this.toasterService.showSuccess(res.success, 'Success');
          this.setPassword = true;
        }
      },
      error => {
        this.toasterService.showError('Unauthorized access', 'Error');
        // console.log('Something went wrong',error);
      }
    );
  }

}
