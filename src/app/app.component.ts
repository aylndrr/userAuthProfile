import {Component} from '@angular/core';
import {Service} from './service/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent {
  title = 'userAuthProfile';
  isAuth: boolean = false;

  constructor(private service: Service, private router: Router) {
    this.isAuth = service.isLogin();
  }

  DestroyStorage() {
    this.service.logOut();
    this.router.navigate(['/login']);
  }
}

