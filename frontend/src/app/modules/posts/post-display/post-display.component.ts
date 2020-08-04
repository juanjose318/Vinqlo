import { Component,  ViewChild, Input } from '@angular/core';
import { faEllipsisH, faBookmark, faComments } from '@fortawesome/free-solid-svg-icons';
import {MatAccordion} from '@angular/material/expansion';
import { Post } from '../post-list/post-list.component';
@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})

export class PostDisplayComponent{
  @Input()
  items: Post;

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
