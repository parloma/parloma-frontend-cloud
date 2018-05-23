import { Component, OnInit } from '@angular/core';
import { RosService, RosLog } from '../../ros.service';


@Component({
  selector: 'app-logs-console',
  templateUrl: './logs-console.component.html',
  styleUrls: ['../console.element.scss', "./logs-console.component.scss"]
})
export class LogsConsoleComponent implements OnInit {

  logNode: any;
  maxLog = 100;
  // public logs: RosLog[];
  constructor(public rosService: RosService) { 
    this.logNode = undefined;
  }

  logs() {
    let logs: RosLog[] = [];
    if (this.logNode) {
      logs = this.rosService.logs.filter(log => log.name == this.logNode.name);
    } else {
      logs = this.rosService.logs;
    }

    return logs.slice(Math.max(logs.length - this.maxLog, 1));
  }

  ngOnInit() {
    this.rosService.nodes
  }

  logClassFromLog(log: RosLog) {
    if (log.level == 2) {
      return 'info';
    } else if (log.level == 4) {
      return 'warning';
    } else if (log.level == 8){
      return 'error';
    } else if (log.level == 16){
      return 'fatal';
    } 
  }

}
