import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../models/post.interface';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-single-page',
  templateUrl: 'post-single.component.html',
  styleUrls: ['./post-single.component.scss'],
})
export class PostSingleComponent implements OnInit {
  post: Post;
  userId: string;
  private authStatusSub: Subscription;
  userIsAuthenticated: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(switchMap((data) => this.postService.getSinglePost(data)))
      .subscribe((data) => (this.post = data.post));
    this.userId = this.authService.getUserId();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  /**
   * Set Timeout to refresh page and not interrupt the http call
   * Files changed kept in backend, specify in GPDR
   */
  handleUpdate(updatedPost) {
    if (!!updatedPost) {
      this.postService.updatePost(updatedPost);
      this.post = updatedPost;
      setTimeout(this.refresh, 200);
    }
  }

  refresh() {
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
}

  handleDelete(postToDelete) {
    this.postService.deletePost(postToDelete);
    this.location.back();
  }

  handleCommentCreated(comment) {
    this.postService.addCommentPost(comment).subscribe(() => {
        this.post.comments.push(comment);
    });
  }

  handleUserViewed(userId) {
    this.router.navigate(['/profile', userId]);
  }

  handleLiked(postId) {
    this.postService.likeToggle(postId);
  }

  handlePostAddedToCollection(userId){
    this.postService.addPostToCollection(userId);
  }

  goBack() {
    this.router.navigate(['/feed']);
  }
}
