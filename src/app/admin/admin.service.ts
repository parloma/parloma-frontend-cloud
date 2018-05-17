import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../confs/configs.module';

import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import { share } from 'rxjs/operators';

export interface NewUser {
  email: string,
  password: string
}


export interface User {
  email: string;
  id?: number;
}

export interface RegisterToken {
  id?: number;
  token: string;
  role: string;
}

export interface Robot {
  ips: string[],
  addr: string
}

@Injectable()
export class AdminService {

  users: Observable<User[]>;
  private usersObserver: Observer<User[]>;

  robots: Observable<Robot[]>;
  private robotsObserver: Observer<Robot[]>;

  tokens: Observable<RegisterToken[]>;
  private tokensObserver: Observer<RegisterToken[]>;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
    )
    { 
      this.users = new Observable<User[]>(observer => 
        this.usersObserver = observer
      ).pipe(share());

      this.robots = new Observable<Robot[]>(observer => 
        this.robotsObserver = observer
      ).pipe(share());

      this.tokens = new Observable<RegisterToken[]>(observer => 
        this.tokensObserver = observer
      ).pipe(share());

    }

  getUsers() {
    console.log(this.config.adminEnd + '/users');
    this.http.get<User[]>(this.config.adminEnd + '/users').subscribe(
      (users) => this.usersObserver.next(users)
    )
    return this.users;
  }

  createUser(user: NewUser) {
    this.http.post<NewUser>(this.config.adminEnd + '/users', user).subscribe(
      (user) => this.getUsers()
    )
  }

  deleteUser(user:User) {
    this.http.delete(this.config.adminEnd + '/users/' + user.id).subscribe(
      (user) => this.getUsers()
    );
  }

  getRobots() {
    this.http.get<Robot[]>(this.config.adminEnd + '/robots').subscribe(
      (robots) => this.robotsObserver.next(robots)
    )
    return this.robots;
  }

  getTokens() {
    this.http.get<RegisterToken[]>(this.config.adminEnd + '/tokens').subscribe(
      (tokens) => this.tokensObserver.next(tokens)
    )
    return this.tokens;
  }

  createToken(token: RegisterToken) {
    this.http.post(this.config.adminEnd + '/tokens', token).subscribe(
      (data) => this.getTokens()
    )
  }

  deleteToken(token) {
    this.http.delete(this.config.adminEnd + '/tokens/' + token.id).subscribe(
      (data) => this.getTokens()
    );
  }


    

}
