import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserAlt,
  faList,
  faEnvelope,
  faSignInAlt,
  faEllipsisV,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.services';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userId: string;

  faUserAlt = faUserAlt;
  faList = faList;
  faEnvelope = faEnvelope;
  faSignInAlt = faSignInAlt;
  faEllipsisV = faEllipsisV;
  faSignOutAlt = faSignOutAlt;
  faUserPlus = faUserPlus;

  private authStatusListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authStatusListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authStatusListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  goToProfile(userId) {
    this.router.navigate(['/profile/', userId]);
  }
}
