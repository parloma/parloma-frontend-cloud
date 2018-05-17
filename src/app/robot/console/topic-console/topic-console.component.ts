import { Component, OnInit } from '@angular/core';
import { RosService, Topic } from '../../ros.service';

@Component({
  selector: 'app-topic-console',
  templateUrl: './topic-console.component.html',
  styleUrls: ['../console.element.scss', './topic-console.component.scss']
})
export class TopicConsoleComponent implements OnInit {

  constructor(public rosService: RosService) { }

  topics() {
    return this.rosService.topics;
  }

  toggle(topic: Topic) {
    topic.toggleLog();
  }
  ngOnInit() {
  }

}
