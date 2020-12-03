import { Component,  ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faEllipsisH, faBookmark, faComments } from '@fortawesome/free-solid-svg-icons';
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

  onDelete(post){
    this.postDeleted.emit(post);
  }
}
