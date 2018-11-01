import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  forgotPasswordDetails : Object;

  constructor(private fb : FormBuilder,
              private apiService : ApiService) {
    this.forgotPasswordForm = fb.group({
      email : ['',Validators.compose([
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
              ])]
    });
  }

  onSubmit(){
    this.forgotPasswordDetails = this.forgotPasswordForm.value;
    this.apiService.forgotPasswordRequest(this.forgotPasswordDetails).subscribe(
      forgotpassword=>{
        console.log(forgotpassword,' after subscribe response');
      }
    )
    this.forgotPasswordForm.reset();
  }

  ngOnInit() {
  }

}
