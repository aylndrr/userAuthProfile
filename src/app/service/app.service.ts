import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';

export class Users {
  ID: number;
  Name: string;
  Surname: string;
  Age: number;
  Email: string;
  Username: string;
  Password: string;
}

const users: Users[] = [{
  ID: 1,
  Name: 'Aylin',
  Surname: 'Durur',
  Email: 'asd@gmail.com',
  Username: 'aylin',
  Password: '123456',
  Age: 26
}, {
  ID: 2,
  Name: 'Ezgi',
  Surname: 'Kütük',
  Email: 'asd@gmail.com',
  Username: 'ezgi',
  Password: '123456',
  Age: 24
}, {
  ID: 3,
  Name: 'Elif',
  Surname: 'Dalkıran',
  Email: 'asd@gmail.com',
  Username: 'elif',
  Password: '123456',
  Age: 25
}, {
  ID: 4,
  Name: 'Ebru',
  Surname: 'Çatak',
  Email: 'asd@gmail.com',
  Username: 'ebru',
  Password: '123456',
  Age: 24
}];

@Injectable()
export class Service {

  constructor(private router: Router, private localSt: LocalStorageService) {
  }

  getUsers(): Users[] {
    return users;
  }

  // tslint:disable-next-line:ban-types
  isLoggedIn(username: String, password: String): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let n = 0; n < users.length; ++n) {
      if (users[n].Username === username && users[n].Password === password) {
        this.localSt.store('token', Date.now().toString());
        // localStorage.setItem('token', Date.now().toString());
        return true;
      } else {
        return false;
      }
    }
  }

  isAuth(): boolean {
    // const token = localStorage.getItem('token');
    const token = this.localSt.retrieve('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    // localStorage.removeItem('token');
    this.localSt.clear('token');
  }
}
