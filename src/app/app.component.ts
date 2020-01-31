import { Component } from '@angular/core';
import {Service, Users} from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent {
  title = 'userAuthProfile';
  users = Users[0];

  constructor(private service: Service) {
    this.users = service.getUsers();
    console.log(this.users);
  }
}

