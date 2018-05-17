import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../confs/configs.module';
import { Robot } from './robot';
import { timeout } from 'rxjs/operators';

@Injectable()
export class LocalRobotService {

  robot: Robot;
  private discoveryInterval: any;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { 
    this.robot = new Robot;
    this.robot.ip = this.config.robot_local_ip;
  }

  getRobot() {
    if (this.robot.bridge) {
      return this.robot;
    } else {
      return undefined;
    }
  }

  start() {
    this.discoveryInterval = setInterval(()=>this.checkRobot(), 2000);
    this.checkRobot();
  }

  isSearching() {
    return this.discoveryInterval != undefined;
  }

  stop() {
    clearInterval(this.discoveryInterval);
    this.discoveryInterval = undefined;
  }

  checkRobot() {
    this.http.get("http://" + this.robot.ip + '/api/discovery')
      .pipe(timeout(500))  
      .subscribe( data => {
        this.robot.setData(data);
      })
  }
}
