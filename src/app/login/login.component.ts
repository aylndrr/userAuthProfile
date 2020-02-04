import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Service} from '../service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Service]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

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

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.service.login(this.f.username.value, this.f.password.value, this.f.rememberMe.value)) {
      this.router.navigate(['/']);
    }
  }
}





