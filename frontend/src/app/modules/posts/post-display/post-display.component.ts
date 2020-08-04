import { Component,  ViewChild } from '@angular/core';
import { faEllipsisH, faBookmark, faComments } from '@fortawesome/free-solid-svg-icons';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})

export class PostDisplayComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  faEllipsisH = faEllipsisH;
  faComments = faComments;
  faBookmark = faBookmark;
  panelOpenState: boolean = false;

  toggleComments () {
    this.panelOpenState = !this.panelOpenState;
    if (this.panelOpenState)
      this.accordion.openAll()
    else
      this.accordion.closeAll()
  }

}
