import { Injectable } from '@angular/core';
import { Ros, Topic as RoslibTopic } from 'roslib';
import { CanActivate } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Robot } from './robot';

export class Topic extends RoslibTopic {
  data: any;
  private _isLogging: boolean = false;

  log(msg: any) {
    this.data = msg;
  }

  public startLog() {
    if (this.messageType != 'sensor_msgs/Image'){
      this.subscribe( msg => {
        this.log(msg);
      });
    }
    this._isLogging = true;
  }

  public stopLog() {
    this.unsubscribe();
    this._isLogging = false;
  }

  public toggleLog() {
    if (this._isLogging) {
      this.stopLog();
    } else {
      this.startLog();
    }
  }

  public isLogging() {
    return this._isLogging;
  }
}

export class Node {
  private _isLogging: boolean;
  killable: boolean;
  killing: boolean;

  constructor( public name: string, PREVENT_KILL) {
    this.killing = false;
    if (PREVENT_KILL.indexOf(name) >= 0 ) {
      this.killable = false;
    } else {
      this.killable = true;
    }
  };
}

export interface RosLog {
  level: number;
  msg: string;
  name: string;
}


@Injectable()
export class RosService {
  private rosoutTopic: Topic;
  topics: Topic[] = [];
  nodes: Node[] = [];
  public ros: Ros;
  logMaxLenght = 500;

  logs: RosLog[] = [];

  robot:Robot;
  connected: boolean = false;
  timer_sub: Subscription;
  timer: Observable<any>;
  TOPIC_IGNORE = ['/rosout', '/rosout_agg'];
  NODE_PREVENT_KILL = ['/rosapi', '/rosbridge_websocket', '/rosout']

  constructor(
    private http: HttpClient
  ) { 
    this.topics = [];
  }

  disconnect() {
    if (this.ros) {
      this.ros.close();
    }
    this.robot = undefined;
  }

  connect(robot:Robot) {
    this.disconnect();
    this.robot = robot;
    this.ros = new Ros({
      url: 'ws://' + this.robot.bridge
    });

    this.ros.on('connection', ()=> {
      console.log('connected to', this.robot );
      this.connected = true;
      this.rosoutTopic = new Topic({
        ros: this.ros,
        name: '/rosout_agg',
        messageType: 'rosgraph_msgs/Log'
      });

      this.rosoutTopic.subscribe( msg => {
        console.log(msg);
        this.newLog(msg);
      })

      this.timer = Observable.timer(0, 1000);
      this.start();
    });

    this.ros.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
      this.connected = false;
  });

  this.ros.on('close', () => {
      console.log('Connection to websocket server closed.');
      this.connected = false;
      this.logs = [];
      this.topics = [];
      this.nodes = [];
    });
  }

  newLog(msg: any) {
    let log:RosLog = {
      msg: msg.msg,
      name: msg.name,
      level: msg.level
    };
    this.logs.push(log);
    if (this.logs.length > this.logMaxLenght) {
      this.logs.shift();
    }
  }

  start() {
    if (this.timer) {
      this.timer_sub = this.timer.subscribe(() => this.getTopicsAndNodes());
    }
  }

  stop() {
    if (this.timer_sub) {
      this.timer_sub.unsubscribe();
    }
  }

  addNode(name: string) {
    if (this.nodes.map(node=>node.name).indexOf(name) < 0) {
      this.nodes.push(new Node(name, this.NODE_PREVENT_KILL));
    } else {
    }
  }

  getTopicsAndNodes() {
    this.getNodes();
    this.getTopics();
  }

  getNodes() {
    this.ros.getNodes( 
      (nodes) => {
        this.cleanNodes(nodes);
        this.syncNodes(nodes);
      }
    );
  }

  cleanNodes(nodes_names: string[]) {
    this.nodes = this.nodes.filter( node => nodes_names.indexOf(node.name)>=0 );
  }

  syncNodes(nodes_names: string[]) {
    for (let name of nodes_names) {
      this.addNode(name);
    }
  }

  addTopic(name:string, type:string) {
    if (this.TOPIC_IGNORE.indexOf(name) >= 0) {
      return;
    }
    let topics_name = this.topics.map(topic => topic.name);
    if (topics_name.indexOf(name) < 0) {
      let topic: Topic = new Topic({
        ros: this.ros,
        name: name,
        messageType: type
      })
      this.topics.push(topic);
    }
  }

  cleanTopics(topics_name: string[]) {
    this.topics = this.topics.filter( (topic) => topics_name.indexOf(topic.name) >= 0);
  }

  syncTopics(topics: any) {
    for (let i in topics.topics) {
      this.addTopic(topics.topics[i], topics.types[i]);
    }
  }

  getTopics() {
    this.ros.getTopics( (res ) => {
      this.cleanTopics((<any>res).topics);
      this.syncTopics(res);
    });
  }

  isConnected() {
    return this.connected;
  }

  runNode(script:string, id:number) {
    this.http.post('http://' + this.robot.ip + '/api/ros/run', {
      file: script,
      id: id
    }).subscribe(
      data => console.log('ok'),
      err => console.log('error')
    );
  }

  killNode(node:Node) {
    node.killing = true;
    this.http.post('http://' + this.robot.ip + '/api/ros/killnode', {
      node: node.name
    }).subscribe(
      data => console.log('ok'),
      err => node.killing = false
    );
  }


}

@Injectable()
export class RosConnectedGuard implements CanActivate {
  constructor(private rosService: RosService) {}
  canActivate() {
    return this.rosService.isConnected();
  }
}
