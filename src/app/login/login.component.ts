import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {environment} from '../../environments/environment'
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  data: any;

  constructor(fb: FormBuilder, public httpClient: HttpClient, private router: Router) {
    this.form = fb.group({
      email: this.email,
      password: this.password
    });
   }

  ngOnInit(): void {
  }

  login() {
    this.httpClient.post(`${environment.API_URL}/auth/login`, this.form.value).subscribe(data => {
      this.data = data;
      if(this.data.token === undefined || this.data.token === null) {
        alert('Invalid username or password')
      } else {
        alert("Login Successful");
      }
    });
  }

}
