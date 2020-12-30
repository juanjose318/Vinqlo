import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import {
  faArrowAltCircleLeft,
  faEllipsisH,
  faLink,
  faUnlink,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-description-bar',
  templateUrl: './description-bar.component.html',
  styleUrls: ['description-bar.component.scss'],
})
export class DescriptionBarComponent {
  constructor(private location: Location) {}

  joined: boolean = true;

  faArrowLeft = faArrowAltCircleLeft;
  faLink = faLink;
  faUnlink = faUnlink;
  faEllipsisH = faEllipsisH;

  /**
   * TODO:
   * Implement Communities loading the information
   * NEED:
   * Authorization, Communities
   */
  @Input()
  community;

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
