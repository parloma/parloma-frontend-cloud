import { Component, OnInit } from '@angular/core';
import { RosService, Topic } from '../../robot/ros.service';
import { Message } from 'roslib';
import * as Leap from 'leapjs';

@Component({
  selector: 'app-leap',
  templateUrl: './leap.component.html',
  styleUrls: ['./leap.component.scss']
})
export class LeapComponent implements OnInit {

  left_hand: Topic;
  right_hand: Topic;

  constructor(private rosService: RosService) { }

  ngOnInit() {
    this.left_hand = new Topic({
      ros: this.rosService.ros,
      name: '/left/hand',
      messageType: 'sensor_msgs/JointState'
    }); 

    this.right_hand = new Topic({
      ros: this.rosService.ros,
      name: '/right/hand',
      messageType: 'sensor_msgs/JointState'
    })


    this.left_hand.advertise();
    this.right_hand.advertise();

    Leap.loop({
      frame: frame => this.onGesture(frame)
      }
    );
  }

  onGesture(frame) {
    for (let hand of frame.hand) {
      let fingers_pos = [];
      for (let finger of [hand.thumb, hand.indexFinger, hand.middleFinger, hand.ringFinger, hand.pinky]) {
        let pos = (Math.acos(Leap.vec3.dot(hand.direction, finger.direction))) / 180.0;
        if ( pos > 180) pos = 180;
        else if (pos < 0) pos = 0;
        fingers_pos.push(pos);
      }

      let msg = {
        name: ['thumb', 'index', 'middle', 'ring', 'pinky'],
        position: fingers_pos
      };

      if (hand.type == 'right') {
        this.right_hand.publish(msg);
      } else {
        this.left_hand.publish(msg);
      }
      
    }

  }



}
