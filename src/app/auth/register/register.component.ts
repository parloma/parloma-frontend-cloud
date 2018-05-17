import { Component, OnInit } from '@angular/core';
import { DynamicFormControlModel, DynamicInputModel, DynamicFormService, DynamicFormGroupModel} from "@ng-dynamic-forms/core";
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Register } from '../register'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

export function matchingPasswords(control: FormControl): {[s: string]: boolean} {
    const password = control.get('password');
    const confirmPassword = control.get('check_password');
    if (password.value !== confirmPassword.value) {
      console.log('passwords do NOT match');
      return {
        'noMatchingPasswords': true
      };
    } else {
        console.log('passwords match');
      return null;
    }
  }

let passwordModel = new DynamicInputModel({
  id: "password",
  label: "Choose a password",
  maxLength: 42,
  placeholder: "*******",
  inputType: "password",
  validators: {
    required: null,
  },
  errorMessages: {
    required: 'password is required',
  },
});

let passwordCheckModel =   new DynamicInputModel({
  id: "check_password",
  label: "Retype the password",
  maxLength: 42,
  placeholder: "*******",
  inputType: "password",
  validators: {
    required: null,
  },
  errorMessages: {
    required: 'retype password',
  },
});


let passwordSetterGroup = new DynamicFormGroupModel({
  id: 'passwordSetterGroup',
  legend: 'Set your password',
  group: [
    passwordModel,
    passwordCheckModel,
  ],
  validators: {
    matchingPasswords: null
  },
  errorMessages: {
    noMatchingPasswords: 'Passwords need to match',
  }
});



const REGISTER_FORM: DynamicFormControlModel[] = [
  new DynamicInputModel({
    id: "username",
    label: "Insert your username",
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'The Username is required',
    },
    placeholder: "username"
  }),
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
  passwordSetterGroup,
  new DynamicInputModel({
    id: "token",
    label: "Insert registration token if any",
    validators: {
    },
    placeholder: ""
  }),

]


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formModel: DynamicFormControlModel[] = REGISTER_FORM;
  formGroup: FormGroup;
  showAlert:boolean = false;

  constructor(
    private formService: DynamicFormService,
    private router: Router,
    private auth: AuthService
  ) { 
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  ngOnInit() {
  }

  submit(model, isValid: boolean) {
    if (!isValid) {
      console.log('not valid');
      this.showAlert = true;
    } else {
      let data = {
        username: model.username,
        email: model.email,
        password: model.passwordSetterGroup.password,
        token: model.token || ''
      }
      console.log(data);
      this.auth.register(data).subscribe(
        (data) => {
          this.showAlert = false;
          this.router.navigate(['/auth/register/success']);
        },
        (error) => {
          this.showAlert = true;
        }
      )
    }
  }

}
