import { Component, OnInit, OnDestroy } from '@angular/core';
import { RosService } from '../ros.service'
import { Topic } from 'roslib'


enum ToShow {
  Topics = 1,
  Nodes,
  Logs
}

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {
  
  private _toShow:ToShow = ToShow.Logs;
  private visible:boolean = false;

  constructor(
    public rosService: RosService
  ) { }

  ngOnInit() {
    this.rosService.start();
  }

  toggle() {
    this.visible = !this.visible;
  }

  show(toShow: ToShow) {
    this.visible = true;
    this._toShow = toShow;
  }

  showLogs() {
    this.show(ToShow.Logs)
  }

  showTopics() {
    this.show(ToShow.Topics)
  }
  showNodes() {
    this.show(ToShow.Nodes)
  }

  robotIsConnected() {
    return this.rosService.isConnected();
  }


  tabTopics() {
    return this._toShow == ToShow.Topics;
  }

  tabNodes() {
    return this._toShow == ToShow.Nodes;
  }

  tabLogs() {
    return this._toShow == ToShow.Logs;
  }



  ngOnDestroy() {
    this.rosService.stop();
  }

  disconnect() {
    this.rosService.disconnect();
  }


}
