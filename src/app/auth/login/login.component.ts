import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { DynamicFormControlModel, DynamicInputModel, DynamicFormService} from "@ng-dynamic-forms/core";
import { FormGroup } from '@angular/forms';
import { Login } from '../login'
import { Router } from '@angular/router';

const LOGIN_FORM: DynamicFormControlModel[] = [
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
      required: 'The Email is required',
    },
  })
]


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formModel: DynamicFormControlModel[] = LOGIN_FORM;
  formGroup: FormGroup;

  showAlert:boolean = false;


  constructor(
    private auth: AuthService,
    private formService: DynamicFormService,
    private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.showAlert = false;
  }

  submit(model: Login, isValid: boolean) {
    if (!isValid) {
      console.log('not valid');
      this.showAlert = true;
    } else {
      this.auth.login(model).subscribe(
        (data) => {
          this.showAlert = false;
          this.router.navigate(['/']);
          },
        (error) => {
          this.showAlert = true;
        }
      );
    }
  }

}
