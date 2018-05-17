import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login'
import { APP_CONFIG, AppConfig } from '../confs/configs.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, CanDeactivate } from '@angular/router';
import { share } from 'rxjs/operators';
import { Register } from './register';

interface UserInfo {
  roles: string[];
  username: string;
}
interface LogInToken {
  access_token: string;
  user_data: UserInfo;
}

@Injectable()
export class AuthService {

  private user: UserInfo;

  constructor(
      private http: HttpClient,
      @Inject(APP_CONFIG) private config: AppConfig,
      private jwtHelper: JwtHelperService
    ) {
    }

  loggedIn() {
    try {
      return !this.jwtHelper.isTokenExpired();
    } catch(e) {
      return false;
    }
  }

  adminLoggedIn() {
    try {
      return !this.jwtHelper.isTokenExpired() && this.getUser().roles.indexOf('admin')>=0;
    } catch(e) {
      return false;
    }
  }

  login(data: Login) {
    let res = this.http.post<LogInToken>(this.config.userEnd + '/auth', data).pipe(share());
    res.subscribe(
        data => {
          localStorage.setItem('access_token', data.access_token);
          this.user = data.user_data;
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        err => console.log(err)
      );
    return res;
  }

  register(data: Register) {
    let res = this.http.post(this.config.userEnd + '/register', data).pipe(share());
    res.subscribe(
        data => {
        },
        err => console.log(err)
      );
    return res;  
  }

  activateUser(token:string) {
    let res = this.http.post(this.config.userEnd + '/activate', {activation_token:token}).pipe(share());
    return res;
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }

  getUser(): UserInfo {
    if (this.loggedIn()) {
      if (!this.user) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      return this.user;
    }
  }

}

@Injectable()
export class AdminLoggedInGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate() {
    return this.auth.adminLoggedIn();
  }
}

@Injectable()
export class UserLoggedInGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate() {
    return this.auth.loggedIn();
  }
}

@Injectable()
export class UserNotLoggedInGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate() {
    return !this.auth.loggedIn();
  }
}
