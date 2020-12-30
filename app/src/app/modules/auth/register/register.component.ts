import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.services';

@Component({
  selector: 'selector-name',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  name: string;
  lastName: string;
  email: string;
  password: string;
  degree: string;
  campus: string;
  domain: string;
  isLoading: boolean;
  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  /**
   * Check for errors using authStatus listener
   */
  ngOnInit(): void {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

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

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onRegisterForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signUp(form.value);
  }
}
