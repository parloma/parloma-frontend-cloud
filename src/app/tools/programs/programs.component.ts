import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../program';
import { Router } from '@angular/router';

import { DynamicFormControlModel, DynamicInputModel, DynamicFormService} from "@ng-dynamic-forms/core";
import { FormGroup } from '@angular/forms';

const NEW_PROGRAM_FORM: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: 'name',
    label: 'Insert New Program Name',
    validators: {
      required: null
    },
    errorMessages: {
      required: "The Name is required"
    }
  })
]


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  formModel: DynamicFormControlModel[] = NEW_PROGRAM_FORM;
  formGroup: FormGroup;

  constructor(
    public programService: ProgramService,
    private router: Router,
    private formService: DynamicFormService
  ) {
      this.formGroup = this.formService.createFormGroup(this.formModel);
   }

  ngOnInit() {
    this.programService.getPrograms();
  }

  addProgram(program: Program, isValid: boolean) {
    this.programService.create(program);
  }

  open(program:Program) {
    console.log(program);
    this.programService.getProgram(program).subscribe(
      () => this.router.navigate(['/tools/edit'])
    );
  }

  delete(program:Program) {
    this.programService.deleteProgram(program);
  }

}
