import { Component } from '@angular/core';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { PostService } from 'src/app/modules/posts/services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.scss' ]
})

export class FeedComponent {
  constructor( private postsService: PostService) { }

  onPostCreated(post: Post){
    this.postsService.addPost(post);
  }

  handleDelete(post): void{
    this.postsService.deletePost(post);
  }

}
