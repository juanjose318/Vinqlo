import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent {

@Input()
posts: Post;

@Output()
postDeleted = new EventEmitter();

constructor() {}

onPostDeleted(post) {
  this.postDeleted.emit(post);
}

}
