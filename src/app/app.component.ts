import {Component} from '@angular/core';
import {Service, Users} from './service/app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent {
  title = 'userAuthProfile';
  users = Users[0];
  isAuth: boolean = false;

  constructor(private service: Service, private router: Router) {
    this.users = service.getUsers();
    console.log(this.users);
    this.isAuth = service.isAuth();
    // console.log(localStorage.getItem('token'));
    // console.log(service.isAuth());
  }

  DestroyStorage() {
    this.service.logOut();
    this.router.navigate(['/login']);
  }
}

