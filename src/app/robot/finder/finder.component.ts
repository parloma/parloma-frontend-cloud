import { Component, OnInit, OnDestroy } from '@angular/core';
import { RobotService } from '../robot.service'
import { Robot } from '../robot';
import { RosService } from '../ros.service';
import { DynamicFormControlModel, DynamicInputModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

const FIND_ROBOT_FORM: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: "ip",
    label: "Insert robot ip",
    validators: {
      required: null
    },
    errorMessages: {
      required: 'The IP is required'
    },
    placeholder: "127.0.0.1:9090"
  })
]

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit, OnDestroy {

  formModel: DynamicFormControlModel[] = FIND_ROBOT_FORM;
  formGroup: FormGroup;

  constructor(
    public robotService:  RobotService,
    public rosService: RosService,
    public formService: DynamicFormService
  ) { 
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  isSearching() {
    return this.robotService.isSearching();
  }

  startSearching() {
    this.robotService.startDiscovery();
  }

  stopSearching() {
    this.robotService.stopDiscovery();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.stopSearching();
  }

  connectRobot(robot:Robot) {
    this.rosService.connect(robot);
  }

  connectIp(model:any, isValid: boolean) {
    if (isValid) {
      let robot = new Robot();
      robot.ip = model.ip;
      this.robotService.testRobot(robot).subscribe(
        (data) => this.rosService.connect(robot)
      )
    }
  }

  blinkRobot(robot:Robot) {
    this.robotService.blinkRobot(robot);
  }


}
