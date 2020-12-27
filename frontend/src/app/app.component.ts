import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( private authService : AuthService){}

  title = 'vinqlo';

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

}
