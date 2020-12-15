import { Component,  ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { faEllipsisH, faBookmark, faComments, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Post } from '../../models/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})

export class PostDisplayComponent {
  constructor(  private router: Router ) {}
  @Input()
  items;

  @Output()
  postDeleted = new EventEmitter();

  @Output()
  postViewed = new EventEmitter();

  @ViewChild(MatExpansionPanel) expansionPannel: MatExpansionPanel;
  faEllipsisH = faEllipsisH;
  faComments = faComments;
  faBookmark = faBookmark;
  faHeart = faHeart;
  faShare = faShare;

  onView(post:Post) {
    this.router.navigate(['/posts/',post._id])
  }

  onDelete(post: Post){
    this.postDeleted.emit(post);
  }
}
