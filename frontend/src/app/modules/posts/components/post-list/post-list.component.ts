import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent  {

@Input()
posts: Post;

@Output()
postDeleted = new EventEmitter();

@Output()
postEdited = new EventEmitter();

constructor() {}

onPostDeleted(post: Post) {
  this.postDeleted.emit(post);
}

onPostEdited(post: Post) {
  this.postEdited.emit(post);
}

}
