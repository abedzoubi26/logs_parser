import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogsService } from '../../services/logs.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-upload-log',
  templateUrl: './upload-log.component.html',
  styleUrls: ['./upload-log.component.scss']
})
export class UploadLogComponent implements OnInit {

  uploadLog: FormGroup;
  files:any;
  submitEnabled: any = false;
  constructor(
    public fb: FormBuilder,
    public logService: LogsService,
    public router: Router
  ) {
    this.uploadLog = this.fb.group({
      log: null,
    });
  }

  ngOnInit() {
    this.uploadLog = this.fb.group({
      log: [null, Validators.required],
    });
  }
  handleFileInput(event: any) {
      this.submitEnabled = !![...event.target.files].length
      this.files = event.target.files[0];
  }
  saveLogFile() {
    
    const formData: any = new FormData();
    formData.append("log",this.files,this.files.name);
    this.logService.saveLog(formData).pipe(catchError(this.handleError.bind(this))).subscribe((res: any) => {
      console.log(res);
      
      if (res.status == true ) {
        this.uploadLog.reset();
        this.router.navigate(['home']);
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    // this.errors = error;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => msg);
  }

}
