import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { ProfileService } from '../../profile.services';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userProfileData;
  userId: string;
  userIsAuthenticated: boolean;

  private authStatusListenerSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private profileService : ProfileService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authStatusListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.route.params
    .pipe(switchMap((userId) => this.profileService.getProfileInfo(userId)))
    .subscribe((data) => {
      this.userProfileData = data;
    });
  }

  ngOnDestroy() {
    this.authStatusListenerSubs.unsubscribe();
  }

  onUserEdited(user){
    console.log(user);
    this.profileService.updateProfileInfo(user);
  }
}
