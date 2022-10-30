import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
} from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40)
        ]
      ],
    });
  }
  get fcontrols(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  onSubmit() {
    this.submitted = true;
  
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.signUp(this.signupForm.value).pipe(catchError(this.handleError.bind(this))).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }
  handleError(error: HttpErrorResponse) {
    Object.keys(error.error).map(
      (item) => {
        this.fcontrols[item].setErrors({'backend': error.error[item]});
      }
    )
    return '';
  }
}
