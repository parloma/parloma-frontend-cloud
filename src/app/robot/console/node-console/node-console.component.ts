import { Component, OnInit } from '@angular/core';
import { RosService, Node } from '../../ros.service';

@Component({
  selector: 'app-node-console',
  templateUrl: './node-console.component.html',
  styleUrls: ['../console.element.scss', './node-console.component.scss']
})
export class NodeConsoleComponent implements OnInit {

  constructor(private rosService: RosService) { }

  kill(node: Node) {
    this.rosService.killNode(node);
  }

  nodes() {
    return this.rosService.nodes;
  }

  ngOnInit() {
  }

}
