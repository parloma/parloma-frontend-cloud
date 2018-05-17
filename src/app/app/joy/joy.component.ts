import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RosService, Topic } from '../../robot/ros.service';

class Point2D {
  constructor(public x: number, public y: number) {
  }

  diff(other: Point2D): Point2D {
    let point: Point2D = new Point2D(this.x - other.x, this.y - other.y);
    return point;
  }

  yInverted(): Point2D {
    return new Point2D(this.x, -this.y);
  }

  scale(scale:number) {
    return new Point2D(this.x*scale, this.y*scale);
  }
}

@Component({
  selector: 'app-joy',
  templateUrl: './joy.component.html',
  styleUrls: ['./joy.component.scss']
})
export class JoyComponent implements OnInit, AfterViewInit {

  @ViewChild("joyCanvas") joyCanvas: ElementRef;

  clicked: boolean;
  start: Point2D;
  joy: Topic;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  cmd: Point2D;

  constructor(private rosService: RosService) { 
    this.clicked = false;
    this.start = new Point2D(0,0);
    this.cmd = new Point2D(0,0);
  }

  ngOnInit() {
    this.joy = new Topic({
      ros: this.rosService.ros,
      name: '/joy',
      messageType: 'geometry_msgs/Vector3'
    })

    this.joy.advertise();
  }

  ngAfterViewInit(): void {
    console.log('test');
    this.canvas = (<HTMLCanvasElement>this.joyCanvas.nativeElement);
    this.ctx = this.canvas.getContext('2d');
  }
  

  private currentPoint(e): Point2D {
    let rect = this.canvas.getBoundingClientRect();
    let point = new Point2D(e.clientX - rect.left, e.clientY - rect.top);
    return point;
  }

  drawCircle(point: Point2D, radious: number, color: string) {
    this.ctx.beginPath();
    this.ctx.arc(point.x,point.y, radious,0,2*Math.PI);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  down(e) {
    this.clicked  = true;
    let rect = this.canvas.getBoundingClientRect();
    console.log('cliccked', e);
    this.start = this.currentPoint(e);
    this.drawJoy(this.start, this.start);
  }

  up(e) {
    this.clicked  =false;
    console.log('released', e);
    this.cmd = new Point2D(0,0);
    this.joy.publish(this.cmd);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drag(e) {
    let rect = this.canvas.getBoundingClientRect();
    if (this.clicked) {
      let point: Point2D = this.currentPoint(e);
      this.cmd = point.diff(this.start).yInverted().scale(0.01);
      this.joy.publish(this.cmd);
      this.drawJoy(this.start, point);
    }
  }

  drawJoy(start: Point2D, stop:Point2D) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCircle(this.start, 25, 'blue')
    this.drawCircle(stop, 20, 'red')
  }


}
