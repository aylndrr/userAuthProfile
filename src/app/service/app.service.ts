import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {User, USERS} from '../models/user.model';


@Injectable()
export class Service {

  users: User[];

  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.users = USERS;
  }

  getUsers(): User[] {
    return this.users;
  }

  getCurrentUser(username: string, password: string): User | null {
    return this.users.find(x => x.Username === username && x.Password === password);
  }

  login(username: string, password: string, rememberMe: boolean): boolean {
    let isFound = false;
    const user = this.getCurrentUser(username, password);
    if (user) {
      isFound = true;
      if (rememberMe === true) {
        this.localStorageService.store('username', username);
      }
      this.localStorageService.store('token', Date.now().toString());
    }
    return isFound;
  }


  isLogin(): boolean {
    const token = this.localStorageService.retrieve('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logOut(): void {
    this.localStorageService.clear('token');
  }
}
