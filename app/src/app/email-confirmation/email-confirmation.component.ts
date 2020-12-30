import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'email-confirmation.component.html',
  styleUrls: ['email-confirmation.component.scss'],
})
export class EmailConfirmationComponent {
  constructor(private router: Router) {}
  onLogin() {
    this.router.navigate(['/login']);
  }
}
