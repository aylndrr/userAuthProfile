import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      username: ['' , Validators.required ],
      password: ['' , Validators.required ]
    });
  }

  ngOnInit() {
   
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}





