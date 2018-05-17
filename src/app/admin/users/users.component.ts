import { Component, OnInit } from '@angular/core';
import { AdminService, User, NewUser } from '../admin.service'

import { DynamicFormControlModel, DynamicInputModel, DynamicFormService} from "@ng-dynamic-forms/core";
import { FormGroup } from '@angular/forms';


const NEW_USER_FORM: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: "email",
    label: "Insert your email",
    validators: {
      email: null,
      required: null,
    },
    errorMessages: {
      email: 'The Email is not valid',
      required: 'The Email is required',
    },
    placeholder: "email"
  }),
  new DynamicInputModel({
    id: "password",
    label: "Insert your password",
    maxLength: 42,
    placeholder: "*******",
    inputType: "password",
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'The Password is required',
    },
  })
]

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  formModel: DynamicFormControlModel[] = NEW_USER_FORM;
  formGroup: FormGroup;

  constructor(
    private adminService: AdminService,
    private formService: DynamicFormService) { }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.adminService.getUsers().subscribe(
      (users) => {this.users = users;}
    )
  }

  deleteUser(user:User) {
    this.adminService.deleteUser(user);
  }

  submit(model: NewUser, isValid: boolean) {
    if (!isValid) {
      console.log('not valid');
    } else {
      this.adminService.createUser(model);
    }
  }


}
