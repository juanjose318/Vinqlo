import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'selector-name',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor( private router: Router) { }

  onLogin(){
    this.router.navigate(['/auth/login']);
  }

  onSignUp(){
    this.router.navigate(['/auth/register']);
  }
}
