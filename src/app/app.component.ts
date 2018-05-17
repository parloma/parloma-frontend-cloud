import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'
import { RobotService } from './robot/robot.service'
import { RosService } from './robot/ros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(
    private authService: AuthService,
    public robotService: RobotService,
    private rosService: RosService
  ) {}


  robotIsConnected() {
    return this.rosService.isConnected();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  adminLoggedIn() {
    return this.authService.adminLoggedIn();
  }


  logOut() {
    return this.authService.logOut();
  }

}
