import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  robocoin: number = 2004.3;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  getUser() {
    return this.auth.getUser();
  }

}
