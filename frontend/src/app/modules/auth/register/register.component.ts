import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControlStatus, NgForm } from '@angular/forms';
import { AuthService } from '../auth.services';

@Component({
  selector: 'selector-name',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  name: string;
  lastName: string;
  email: string;
  password: string;
  degree: string;
  campus: string;
  domain: string;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(this.name),
      lastName: new FormControl(this.lastName),
      email: new FormControl(this.email),
      domain: new FormControl(this.domain),
      password: new FormControl(this.password),
      degree: new FormControl(this.degree),
      campus: new FormControl(this.campus),
    });
  }

  onRegisterForm(form: NgForm) {
    if (form.valid) {
      this.authService.signUp(form.value);
    }
  }
}
