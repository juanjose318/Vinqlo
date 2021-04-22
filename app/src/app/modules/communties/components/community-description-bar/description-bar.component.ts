import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import {
  faArrowAltCircleLeft,
  faEllipsisH,
  faLink,
  faUnlink,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Community } from '../../models/community.interface';

@Component({
  selector: 'app-description-bar',
  templateUrl: './description-bar.component.html',
  styleUrls: ['description-bar.component.scss'],
})
export class CommunityDescriptionBarComponent {
  constructor(private location: Location) {}

  joined: boolean = true;

  faArrowLeft = faArrowAltCircleLeft;
  faLink = faLink;
  faUnlink = faUnlink;
  faEllipsisH = faEllipsisH;
  faUsers = faUsers;


  @Input()
  community: Community;

  @Output()
  joinCommunity: EventEmitter<string> = new EventEmitter<string>();

  goBack() {
    this.location.back();
  }

  toggleJoinButton() {
    if (this.joined) {
      this.joined = false;
    } else {
      this.joined = true;
    }
  }
}
