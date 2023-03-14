import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm : FormGroup;
  constructor(private formBuilder: FormBuilder,) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      password_confirmed: ''
    });
   }

  ngOnInit() {
  }

  register() {

  }
}
