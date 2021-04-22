import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { CommunityService } from '../../community.service';
import { switchMap } from 'rxjs/operators';
import { Community } from '../../models/community.interface';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-selector-name',
  templateUrl: './community-single.component.html',
  styleUrls: ['community-single.component.scss']
})

export class CommunitySingleComponent implements OnInit {
  community: Community;
  userId;
  private authStatusSub: Subscription;
  userIsAuthenticated: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private location: Location,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((data) => this.communityService.getCommunity(data)))
      .subscribe((data) => {
        this.community = data['community'];
      });
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
   }
}
