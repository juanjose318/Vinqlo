import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { PostService } from 'src/app/modules/posts/services/posts.service';
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
    private router: Router,
    private profileService : ProfileService,
    private location: Location,
    private authService: AuthService,
    private postService: PostService) { }

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

  handleLiked(postId){
    this.postService.likeToggle(postId);
  }

  handleAddToCollection(postId) {
    this.postService.addPostToCollection(postId);
  }

  handlePostViewed(postId) {
    this.router.navigate(['/posts', postId]);
  }

  handleUserEdited(user){
    this.profileService.updateProfileInfo(user);
    setTimeout(this.refresh, 200);
  }

  refresh() {
    window.location.reload();
  }
}
