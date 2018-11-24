//-----Componenet.ts file
npm install ngx-uploader
npm install formidable
npm install path
//----------Image Upload----

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { API_URL } from '../../constants/constants';
import 'rxjs/add/observable/timer';
import * as Rx from 'rxjs';


  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: `${API_URL}/product/fileUpload`,
        method: 'POST',
        data: { total_files: this.files.length.toString(), type: 'document' }
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
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
      if (output.file.response.code == 200) {
        output.file.response.data.forEach(one => {
          this.docUpload.push(one)
        })
      }
      else {
        this.messageService.add({ severity: 'error', detail: output.file.response.msg });
      }
    }
  }
  //------------------END---------------------

//-----------Controller-----------

//--------------------Image Upload----------------
let path = require('path');
let formidable = require("formidable");
let handlebars = require('handlebars');
let mailer = require('../../mailer/mailer');
let serverCtrl = require('../server/server.controller');
let fs = require('fs');
let randomstring = require("randomstring");

let imageUrl = './public/assets/uploads';
exports.saveImageDocument = async function (req, res) {
    var completeFlag = false;
    const form = new formidable.IncomingForm();
    form.uploadDir = imageUrl;
    form.keepExtensions = true;
    var pathSeparator = path.sep;

    let count = 0;
    form.on('error', (err) => {
        console.log('error', err);
    });
    form.parse(req, async function (err, fields, files) {
        let multipleUpload = new Promise(async (resolve, reject) => {
            let newImgUrls = [];
            if (Object.keys(files).length > 0) {
                for (var field in files) {
                    var fileType = files[field].type.substring(0, 5);
                    if (fileType == 'image') {
                        if (files[field].path) {
                            var filePATH = `${files[field].path}`.replace('public/','');
                            count++;
                            newImgUrls.push({
                                'name': filePATH
                            })
                            if (count == Object.keys(files).length) {
                                completeFlag = true;
                                resolve(newImgUrls);
                            }
                        }
                    } else {
                        res.json({
                            code: 500,
                            message: "Invalid image format."
                        })
                    }
                }
            }
        });
        let upload = await multipleUpload;
        if (upload && completeFlag) {
           
            res.json({
                code: 200,
                message: "Images upload successfully.",
                data: upload

            })
        } else {
            res.json({
                code: 500,
                message: "An occured while uploading images."
            })
        }
    })
}
//------------END--------------------

//-----Routes--

  route.post('/fileUpload', productCtrl.saveImageDocument);


//-------html-----------
 <div class="col-md-3">
            <div class="form-group">
              <label>Product Image</label>
              <!-- <input type="file" [(ngModel)]="uploadImage" formControlName="uploadImage" name="uploadImage" (change)="onFileChange($event)" />  -->
              <input type="file" ngFileSelect [options]="options" (uploadOutput)="onUploadOutput($event)" [uploadInput]="uploadInput" placeholder="Upload Image"
                multiple>
            </div>
          </div>

///---------------app.model-----

import { NgxUploaderModule } from 'ngx-uploader';
//-------Package.json------
    "ng2-file-upload": "^1.3.0",
  "ngx-uploader": "^6.1.0",//-------front end