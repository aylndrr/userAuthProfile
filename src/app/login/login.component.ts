import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Service, Users} from '../service/app.service';
import {compareVersions} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Service]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: Users[];

  constructor(
    private router: Router,
    private service: Service,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: ['']
    });
    this.users = this.service.getUsers();
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // tslint:disable-next-line:one-variable-per-declaration
    let username, password;
    username = this.loginForm.get('username').value;
    password = this.loginForm.get('password').value;
    console.log(this.service.isLoggedIn(username, password));
    if (this.service.isLoggedIn(username, password)) {
      this.router.navigate(['/']);
    }
  }
}





