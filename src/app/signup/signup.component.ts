import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  name = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  data: any;

  constructor(fb: FormBuilder, public httpClient: HttpClient, private router: Router) {
    this.form = fb.group({
      name: this.name,
      email: this.email,
      password: this.password
    });
   }

  ngOnInit(): void {
  }

  signup() {
    this.httpClient.post(`${environment.API_URL}/auth/create`, this.form.value).subscribe(data => {
      this.data = data;
      if(this.data.userId === undefined || this.data.userId === null) {
        alert('Account creation failed')
      } else {
        alert('User Created Successfully')
        this.router.navigate(['/login']);
      }
    });
  }

}
