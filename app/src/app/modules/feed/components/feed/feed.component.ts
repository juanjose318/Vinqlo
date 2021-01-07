import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.services';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { PostService } from 'src/app/modules/posts/services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
@Injectable()
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean;
  userIsAuthenticated: boolean;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private authService: AuthService,
    private postsService: PostService,
    private router: Router
  ) {}

  /**
   * Starts Subscription to check if user is authenticated
   * TODO: Implement for tabs
   */
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getisAuth();
    this.isLoading = true;
    this.postsService.getPosts();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostListener()
      .subscribe((postData: { posts: Post[] }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        console.log(this.posts);
      });
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.postsSub.unsubscribe();
  }

  onPostCreated(newPost: Post) {
    this.postsService.addPost(newPost).subscribe((postData) => {
      this.posts.push(postData.post);
      this.router.navigate(['/posts', newPost._id]);
    });
  }

  handlePostViewed(postId) {
    console.log(postId);
    this.router.navigate(['/posts', postId]);
  }

  handleAddedToCollection(postId) {
    this.postsService.addPostToCollection(postId);
  }

  handleDelete(postId) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts();
      this.posts.filter(() => {
        const updatedPosts = this.posts.filter(
          (deletedPost) => deletedPost._id !== postId
        );
        this.posts = updatedPosts;
      });
    });
  }

  /**
   * TODO: Pagination infite scroll
   */
  onScroll() {}

  handleCreatorViewed(userId) {
    console.log(userId);
    this.router.navigate(['/profile', userId]);
  }

  handleEdit(post: Post): void {
    this.postsService.updatePost(post);
  }
}
