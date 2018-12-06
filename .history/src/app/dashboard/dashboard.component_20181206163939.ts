import { Component, OnInit , EventEmitter } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { ToasterService } from '../core/services/toaster.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
// import { API_URL } from '../../constants/constants';
// import 'rxjs/add/observable/timer';
import * as Rx from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedFile: File = null;

  title = 'socialLogin-ng';
  name: any;
  user: Object;
  token: any;
  isLogin: Boolean;
  signupSpinner = false;
  imageUploadForm: FormGroup;
  imageDetails: Object;
  selectedFiles: any;
  imageChangedEvent: any;
  fileNameData: any;
  fileName: any;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private fb: FormBuilder,
              private jwtService: JwtService,
              private router: Router,
              private apiService: ApiService,
              private toasterService: ToasterService,
              private messageService: MessageService) {
                this.files = []; // local uploading files array
                this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
                this.humanizeBytes = humanizeBytes;

      this.imageUploadForm = fb.group({
        name : ['', Validators.required],
        image : ['', Validators.required]
      });
    }

    fileChange99(event) {
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
     }
     fileUpload99() {
      const fd = new FormData();
      fd.append('amrik', this.selectedFile, this.selectedFile.name);
      this.apiService.uploadFile99(fd).subscribe(
        (data) => {
          console.log(data);
          this.myprofile();
          // console.log("Posted to server");
        });
      }



    filechange(event: any) {
      // console.log(event,'111111');
      this.fileName = <File>event.target.files[0];
      // console.log(this.fileName,'aaaaaa');
      // this.fileNameData = this.fileName.name;
      // console.log(this.fileNameData,'oo');
    }
    onSubmit() {
      this.signupSpinner = true;
      this.imageDetails = this.imageUploadForm.value;
      console.log(this.fileName, '2222222222222222222222');

      const fdd = new FormData();
      fdd.append('name', this.imageUploadForm.value.name);
      fdd.append('image', this.fileName, this.fileName.name);

      this.apiService.imageUploadRequest(fdd).subscribe(
        upload => {
          if (upload) {
            console.log(upload);
            this.signupSpinner = false;
            this.toasterService.showSuccess(upload.success, 'Success');
            // this.router.navigate(['/dashboard']);
            this.myprofile();
          }
        },
        error => {
          this.signupSpinner = false;
          this.toasterService.showError(error.error.error, 'Error');
        }
      );
    }

  destroyToken() {
    this.jwtService.destroyToken();
    this.apiService.sendIsLoginValue(true);
    this.toasterService.showSuccess('You are now logged out', 'Logout success');
    this.router.navigate(['/']);
  }

  myprofile() {
      this.apiService.getMyProfile().subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {

    this.token = this.jwtService.getToken();
    if (this.token == null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

    this.myprofile();
  }

}
