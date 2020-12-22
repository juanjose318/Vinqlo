import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { PostService } from 'src/app/modules/posts/services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
@Injectable()
export class FeedComponent implements OnInit {
  constructor(private postsService: PostService,
    private router: Router) {}
  posts: Post[] = [];
  isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe((data) => (this.posts = data.posts));
    this.isLoading = false;
  }

  onPostCreated(newPost: Post): void {
    this.postsService.addPost(newPost);
    this.posts.push(newPost);
    this.router.navigate(['posts/:id', newPost._id]);
  }

  handleDelete(post: Post): void {
    this.postsService.deletePost(post);
    this.posts.filter(() => {
      const updatedPosts = this.posts.filter(
        (deletedPost) => deletedPost._id !== post._id
      );
      this.posts = updatedPosts;
    });
  }

  handleEdit(post: Post): void {
    this.postsService.updatePost(post);
  }
}
