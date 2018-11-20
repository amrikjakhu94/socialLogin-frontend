import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { ToasterService } from '../core/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  forgotPasswordDetails : Object;
  forgotpasswordSpinner : boolean = false;

  constructor(private fb : FormBuilder,
              private apiService : ApiService,
              private toasterService : ToasterService,
              private router : Router) {
    this.forgotPasswordForm = fb.group({
      email : ['',Validators.compose([
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
              ])]
    });
  }

  onSubmit(){
    this.forgotpasswordSpinner = true;
    this.forgotPasswordDetails = this.forgotPasswordForm.value;
    this.apiService.forgotPasswordRequest(this.forgotPasswordDetails).subscribe(
      forgotpassword=>{
        this.toasterService.showSuccess(forgotpassword.success,'Success');
        this.forgotpasswordSpinner = false;
        console.log(forgotpassword,' after subscribe response');
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error.error,'Error occured');
        this.forgotpasswordSpinner = false;
        this.toasterService.showError(error.error.error,'Error');
      }
    )
    this.forgotPasswordForm.reset();
  }

  ngOnInit() {
  }

}
