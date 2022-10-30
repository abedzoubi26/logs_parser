import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
} from '@angular/common/http';
import { CookieService } from '../../shared/cookie.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  errors: any = [];
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public cookie: CookieService
  ) {
    this.signinForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.signinForm = this.fb.group({
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
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }
    this.authService.signIn(this.signinForm.value).pipe(catchError(this.handleError.bind(this)))
    .subscribe((res: any) => {

      this.authService.setToken(res.access_token)
      this.cookie.setCookie({
        name: 'access_token',
        value: res.access_token,
        session: true,
      });
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser = res;
        this.router.navigate(['home']);
      });
    });
  }
  handleError(error: HttpErrorResponse) {
    if(error.status == 401)
      this.errors['unuthorized'] = 'Invalid username or password';
      console.log(this.errors);
    return '';
  }
}
