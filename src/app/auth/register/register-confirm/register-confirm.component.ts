import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.scss']
})
export class RegisterConfirmComponent implements OnInit {

  token: string;
  confirmed:boolean = false;
  error:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth:AuthService
  ) { }

  activate(token:string) {
    this.auth.activateUser(token).subscribe(
      data => this.confirmed = true,
      error => this.error = true
    )
  }
  

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.token = params['token'];

      if (this.token) {
        this.activate(this.token);
      } else {
        this.error = true;
      }
    });
  }
}
