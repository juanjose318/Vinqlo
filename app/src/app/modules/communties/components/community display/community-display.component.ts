import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faEllipsisH,
  faLink,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-display',
  templateUrl: './community-display.component.html',
  styleUrls: ['community-display.component.scss'],
})
export class CommunityDisplayComponent {
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
  communityjoined: EventEmitter<any> = new EventEmitter<any>();

  faUsers = faUsers;
  faLink = faLink;
  faEllipsisH = faEllipsisH;

  constructor() {}

  onGoToProfile(profileId) {
    this.profileViewed.emit(profileId);
  }

  onGoToCommunity(communityId) {
    this.communityViewed.emit(communityId);
  }

  onCommunityDeleted(communityId) {
    this.communityDeleted.emit(communityId);
  }

  onJoinCommunity(communityId) {
    this.communityjoined.emit(communityId);
  }
}
