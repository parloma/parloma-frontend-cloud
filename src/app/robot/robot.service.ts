import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../confs/configs.module';
import { timeout, share } from 'rxjs/operators';
import { Ros, Topic } from 'roslib';
import { Robot } from './robot';


export interface InternetInterface {
  ip: string,
  interface: string
}

export interface RobotData {
  ips: InternetInterface[];
}


@Injectable()
export class RobotService {

  public robots: Robot[] = [];
  private discoveryInterval: any;

  constructor(
      private http: HttpClient,
      @Inject(APP_CONFIG) private config: AppConfig
    ) {
    }


    getRobots() {
      return this.robots.filter(robot => robot.bridge);
    }

    private robotDiscovery() {
      this.http.get<[RobotData]>(this.config.userEnd+'/robots')
        .subscribe(
          (robots) => {
            console.log(robots);
            for (let robot of robots) {
              this.addRobot(robot);
            }
            this.testRobots();
          }
        )
    }

    private addRobot(robot:RobotData) {
      let wlan_addr = robot.ips.find(addr=>addr.interface == 'wlan0');
      if (wlan_addr) {
        if (!this.robots.find(r => r.ip == wlan_addr.ip)) {
          let robot = new Robot();
          robot.ip = wlan_addr.ip;
          this.robots.push(robot);
        }
      }
    }

    private testRobots() {
      for(let robot of this.robots) {
        this.testRobot(robot).subscribe(
          data => {},
          err => this.robots.splice( this.robots.indexOf(robot) , 1)
        );
      }
    }

    testRobot(robot:Robot) {
      console.log('testing robot:', robot, this.robots);
      let res = this.http.get('http://'+ robot.ip+'/api/discovery');
      res.pipe(share(), timeout(500))
        .subscribe(
        data => robot.setData(data)
      );
      return res;
    }


    blinkRobot(robot:Robot) {
      this.http.post('http://' + robot.ip + '/api/blink', {}).subscribe(
        (data) => console.log('ok')
      )
    }


    startDiscovery() {
      this.discoveryInterval = setInterval(()=>this.robotDiscovery(), 2000);
      this.robotDiscovery();
    }

    isSearching() {
      return this.discoveryInterval != undefined;
    }

    stopDiscovery() {
      clearInterval(this.discoveryInterval);
      this.discoveryInterval = undefined;
    }


}
