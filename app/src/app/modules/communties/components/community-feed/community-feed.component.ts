import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.services';
import { CommunityService } from '../../community.service';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'selector-name',
  templateUrl: './community-feed.component.html',
  styleUrls: ['./community-feed.component.scss'],
})
export class CommunityFeedComponent implements OnInit {
  communities;
  communitiesPerPage: number = 10;
  categoryId: number;
  currentPage = 1;
  maxCommunities: number;
  userId;
  isFollowing: boolean = false;
  private authStatusSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.route.params
      .pipe(
        switchMap((data) =>
          this.communityService.getCommunities(
            data,
            this.communitiesPerPage,
            this.currentPage
          )
        )
      )
      .subscribe((data) => {
        this.categoryId = data.category._id;
        this.communities = data.category.communities;
        this.maxCommunities = data.maxCommunities;
      });
  }

  handleProfileViewed(profileId) {
    this.router.navigate(['/profile', profileId]);
  }

  handleCommunityViewed(communityId) {
    this.router.navigate(['/community', communityId]);
  }

  handleCommunityDeleted(communityId) {
    this.communityService
      .deleteCommunity(this.categoryId, communityId)
      .subscribe(() => {
        this.communityService.getCommunities(
          this.categoryId,
          this.communitiesPerPage,
          this.currentPage
        );
        this.communities.filter(() => {
          const updatedCommunities = this.communities.filter(
            (deletedCommunity) => deletedCommunity._id !== communityId
          );
          this.communities = updatedCommunities;
        });
      });
  }

  handleCommunityJoined(communityId) {
    this.communityService.joinCommunity(communityId);
  }

  handlePageChanged(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.communitiesPerPage = pageData.pageSize;
    this.communityService.getCommunities(
      this.categoryId,
      this.communitiesPerPage,
      this.currentPage
    );
  }
}
