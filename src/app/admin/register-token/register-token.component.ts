import { Component, OnInit } from '@angular/core';
import { AdminService, RegisterToken } from '../admin.service';
import { DynamicFormControlModel, DynamicInputModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

const NEW_TOKEN_FORM: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: "token",
    label: "Insert Token",
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'The Token is required',
    },
    placeholder: "TOKEN"
  }),
  new DynamicInputModel({
    id: "role",
    label: "Insert Role",
    placeholder: 'role',
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'The Role is required',
    },
  })
]


@Component({
  selector: 'app-register-token',
  templateUrl: './register-token.component.html',
  styleUrls: ['./register-token.component.scss']
})
export class RegisterTokenComponent implements OnInit {

  tokens: RegisterToken[];
  formModel: DynamicFormControlModel[] = NEW_TOKEN_FORM;
  formGroup: FormGroup;


  constructor(
    private adminService: AdminService,
    private formService: DynamicFormService
  ) { }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);

    this.adminService.getTokens().subscribe(
      (tokens) => {
        this.tokens = tokens;
        console.log(this.tokens);
      }
    )
  }

  submit(model: RegisterToken, isValid: boolean) {
    if (!isValid) {
      console.log('not valid');
    } else {
      this.adminService.createToken(model);
    }
  }

  deleteToken(token: RegisterToken) {
    this.adminService.deleteToken(token);
  }

}
