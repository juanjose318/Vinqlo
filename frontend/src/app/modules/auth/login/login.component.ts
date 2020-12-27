import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'selector-name',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent {

  constructor( private authService: AuthService,
    private router: Router) {}

  onLoginForm(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.authService.logIn(form.value.email, form.value.password);
  }
}
