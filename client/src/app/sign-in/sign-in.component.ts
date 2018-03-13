import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  formSignIn: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {}
  
  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: '',
      password: ''
    });
  }

  signIn() {
    const { email, password } = this.formSignIn.value;
    this.userService.signIn(email, password);
  }
}
