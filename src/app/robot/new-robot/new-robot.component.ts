import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalRobotService } from '../local-robot.service';

@Component({
  selector: 'app-new-robot',
  templateUrl: './new-robot.component.html',
  styleUrls: ['./new-robot.component.scss']
})
export class NewRobotComponent implements OnInit, OnDestroy {

  constructor(
    private localRobotService: LocalRobotService
  ) { }

  ngOnInit() {
    this.localRobotService.start();
  }

  ngOnDestroy() {
    this.localRobotService.stop();
  }

  getRobot() {
    return this.localRobotService.getRobot();
  }

}
