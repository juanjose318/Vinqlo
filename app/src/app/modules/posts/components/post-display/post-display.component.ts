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
import { Post } from '../../models/post.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/modules/feed/components/create-post/create-post.component';

@Component({
  selector: 'app-post-display',
  styleUrls: ['./post-display.component.scss'],
  templateUrl: 'post-display.component.html',
})
export class PostDisplayComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

  @Input()
  items;

  @Input()
  userId: string;

  @Output()
  postDeleted = new EventEmitter();

  @Output()
  postViewed = new EventEmitter();

  @Output()
  postEdited = new EventEmitter();

  @Output()
  postLiked = new EventEmitter();

  @Output()
  commentCreated = new EventEmitter();

  @Output()
  postAddedToCollection = new EventEmitter();

  isLiked: Boolean;
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

  onLiked(postId) {
    this.postLiked.emit(postId);
  }

  onView(post: Post) {
    this.router.navigate(['/posts/', post.id]);
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
