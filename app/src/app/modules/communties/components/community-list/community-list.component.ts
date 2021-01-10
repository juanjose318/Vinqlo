import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss'],
})
export class CommunityListComponent {
  @Input()
  communities;

  @Input()
  userId: string;

  @Output()
  profileViewed: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  communityViewed: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  communityDeleted: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  communityJoined: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: Router) {}

  onCommunityViewed(communityId) {
    this.communityViewed.emit(communityId);
  }

  onProfileViewed(profileId) {
    this.profileViewed.emit(profileId);
  }

  onCommunityDeleted(communityId) {
    this.communityDeleted.emit(communityId);
  }

  onCommunityJoined(communityId){
    this.communityJoined.emit(communityId);
  }

}
