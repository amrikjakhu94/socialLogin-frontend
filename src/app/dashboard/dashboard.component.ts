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

  selectedFile:File = null;

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
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private fb : FormBuilder,
              private jwtService : JwtService,
              private router : Router,
              private apiService : ApiService,
              private toasterService : ToasterService,
              private messageService: MessageService) {
                this.files = []; // local uploading files array
                this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
                this.humanizeBytes = humanizeBytes;
        
      this.imageUploadForm = fb.group({
        image : ['',Validators.required]
      });
    }

    fileChange99(event) {
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
     }
     fileUpload99(){
      const fd = new FormData();
      fd.append('amrik',this.selectedFile,this.selectedFile.name);
      this.apiService.uploadFile11(fd).subscribe(
        (data)=>{
          console.log(data);
          // console.log("Posted to server");
        });
      }




    onUploadOutput1(): void {
      console.log('qqqqqqq3333');
        
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'http://localhost:3000/fileUpload',
          method: 'POST',
          data : {file:"asd"}
        };
        this.uploadInput.emit(event);
      }
        onUploadOutput(output: UploadOutput): void {
       if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
        this.files.push(output.file);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        // update current data in files array for uploading file
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
      else if (output.type === 'done') {
        console.log(output,"=======");
      }
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
