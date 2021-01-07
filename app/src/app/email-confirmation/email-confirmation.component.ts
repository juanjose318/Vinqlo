import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: 'email-confirmation.component.html',
  styleUrls: ['email-confirmation.component.scss'],
})
export class EmailConfirmationComponent {
  constructor(private router: Router) {}
  onLogin() {
    this.router.navigate(['/login']);
  }
}
