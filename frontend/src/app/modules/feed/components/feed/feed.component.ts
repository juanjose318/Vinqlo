import { Component, Injectable, OnInit } from '@angular/core';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { PostService } from 'src/app/modules/posts/services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
@Injectable()
export class FeedComponent implements OnInit {
  constructor(private postsService: PostService) {}
  posts: Post[] = [];

  ngOnInit() {
    this.postsService.getPosts().subscribe((data) => (this.posts = data.posts));
  }

  onPostCreated(newPost: Post) {
    this.postsService.addPost(newPost);
    this.posts.push(newPost);
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
}
