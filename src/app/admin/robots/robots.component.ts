import { Component, OnInit } from '@angular/core';
import { AdminService, Robot } from '../admin.service'

@Component({
  selector: 'app-robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss']
})
export class RobotsComponent implements OnInit {

  robots: Robot[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getRobots().subscribe(
      (robots) => {this.robots = robots;}
    )
  }

}
