import { Component, OnInit } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { ToasterService } from '../core/services/toaster.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'socialLogin-ng';
  name: any;
  user : Object;
  token : any;
  isLogin : Boolean;
  signupSpinner : boolean = false;
  imageUploadForm : FormGroup;
  imageDetails : Object;
  selectedFiles: any;
  imageChangedEvent: any = '';
  fileNameData: any;
  fileName: any;

  constructor(private fb : FormBuilder,
              private jwtService : JwtService,
              private router : Router,
              private apiService : ApiService,
              private toasterService : ToasterService,
              private messageService: MessageService) {
        
      this.imageUploadForm = fb.group({
        image : ['',Validators.required]
      });
    }

    filechange(event :any){
      // console.log(event,'111111');
      this.imageChangedEvent = event;
      this.fileName = event.target.files[0];
      // console.log(this.fileName,'aaaaaa');
      this.fileNameData = this.fileName.name;
      // console.log(this.fileNameData,'oo');
    }
    onSubmit(){
      this.signupSpinner = true;
      this.imageDetails = this.imageUploadForm.value;
      console.log(this.fileName,'2222222222222222222222');
      this.apiService.imageUploadRequest(this.fileName).subscribe(
        upload=>{
          if(upload){
            console.log(upload);
            this.signupSpinner = false;
            this.toasterService.showSuccess(upload.success,'Success');
            // this.router.navigate(['/dashboard']);
            this.myprofile();
          }
        },
        error=>{
          this.signupSpinner = false;
          this.toasterService.showError(error.error.error,'Error');
        }
      )
    }

  destroyToken(){
    this.jwtService.destroyToken();
    this.apiService.sendIsLoginValue(true);
    this.toasterService.showSuccess('You are now logged out','Logout success');
    this.router.navigate(['/']);
  }

  myprofile(){
      this.apiService.getMyProfile().subscribe(
      user=>{
        this.user = user;
      },
      error=>{
        console.log(error);
      }
    )
  }

  ngOnInit() {

    this.token = this.jwtService.getToken();
    if(this.token == null){
      this.isLogin = false;
    }
    else{
      this.isLogin = true;
    }

    this.myprofile();
  }

}
