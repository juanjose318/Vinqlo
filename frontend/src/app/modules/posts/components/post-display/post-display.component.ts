import { Component,  ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { faEllipsisH, faBookmark, faComments, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})

export class PostDisplayComponent {
  @Input()
  items;

  @Output()
  postDeleted = new EventEmitter();

  @ViewChild(MatExpansionPanel) expansionPannel: MatExpansionPanel;
  faEllipsisH = faEllipsisH;
  faComments = faComments;
  faBookmark = faBookmark;
  faHeart = faHeart;
  faShare = faShare;

  onDelete(post: Post){
    this.postDeleted.emit(post);
  }
}
