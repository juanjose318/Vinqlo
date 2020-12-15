import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnChanges {

@Input()
posts: Post;

@Output()
postDeleted = new EventEmitter();

constructor() {}

ngOnChanges(changes) {
  if (changes.posts) {
    console.log(changes.posts);
  }
}
onPostDeleted(post) {
  this.postDeleted.emit(post);
}

}
