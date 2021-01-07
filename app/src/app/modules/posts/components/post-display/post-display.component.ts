import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  faEllipsisH,
  faBookmark,
  faComments,
  faHeart,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/modules/feed/components/create-post/create-post.component';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})
export class PostDisplayComponent {
  constructor(private router: Router, private dialog: MatDialog,
    private postsService : PostService) {}

  @Input()
  items;

  @Input()
  userId: string;

  @Output()
  postDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  postViewed: EventEmitter<any> = new EventEmitter();

  @Output()
  postEdited: EventEmitter<any> = new EventEmitter();

  @Output()
  postLiked: EventEmitter<any> = new EventEmitter();

  @Output()
  commentCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  postAddedToCollection: EventEmitter<any> = new EventEmitter();

  @Output()
  creatorViewed: EventEmitter<any> = new EventEmitter();

  isLiked: boolean;
  public commentCreatedEvent: Event;

  @ViewChild(MatExpansionPanel) expansionPannel: MatExpansionPanel;
  faEllipsisH = faEllipsisH;
  faComments = faComments;
  faBookmark = faBookmark;
  faHeart = faHeart;
  faShare = faShare;

  /**
   * Opens Dialog when editing and passes data to the dialog, then emits back the edited post to its parent component
   */

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '30%',
      data: { post: this.items },
    });

    dialogRef.afterClosed().subscribe((postUpdated) => {
      if (!!postUpdated) {
        this.postEdited.emit(postUpdated);
      }
    });
  }

  handleLiked(postId) {
    this.postsService.likeToggle(postId).subscribe((postData) => {
      if(postData.status == "liked") {
        this.isLiked = true;
        console.log(this.isLiked);
      } else {
        this.isLiked = false;
        console.log(this.isLiked)
      }
    });
  }

  onView(postId) {
    this.postViewed.emit(postId);
  }

  goToProfile(user) {
    this.creatorViewed.emit(user);
  }

  onDelete(postId) {
    this.postDeleted.emit(postId);
  }

  onAddToCollection(postId) {
    this.postAddedToCollection.emit(postId);
  }

  onCommentCreated(comment) {
    this.commentCreated.emit(comment);
  }
}
