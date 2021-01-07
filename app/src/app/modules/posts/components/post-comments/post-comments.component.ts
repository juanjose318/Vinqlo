import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: 'post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router
  ) {}

  private authStatusSub: Subscription;

  @Input()
  post;

  @Input()
  comment : Event;

  comments = [];
  userId: string;
  userIsAuthenticated: boolean;
  faEllipsisH = faEllipsisH;

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getisAuth();
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  onDelete(comment) {
    this.postService.deleteComment(comment).subscribe(() => {
      this.postService.getSinglePost(comment.post);
      this.post.comments.filter(() => {
        const updatedComments = this.post.comments.filter(
          (deletedComment) => deletedComment._id  !== comment._id
        );
        this.post.comments = updatedComments;
      })
    });

  }

  goToProfile(userId){
    this.router.navigate(['/profile', userId]);
  }

  onCreate(comment) {
    console.log(comment);
  }

  onReport(commentId) {

  }
}
