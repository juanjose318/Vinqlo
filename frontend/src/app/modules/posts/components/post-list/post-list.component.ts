import { Component, Output, EventEmitter, Input } from '@angular/core';
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

isLoading: boolean;

/*
* TODO: Add condition to prevent displaying post display if there are no posts availables
*/
isEmpty: boolean = true;

constructor() {}

onPostDeleted(post: Post) {
  this.isLoading = true;
  this.postDeleted.emit(post);
  this.isLoading = false;
}

onPostEdited(post: Post) {
  this.isLoading = true;
  this.postEdited.emit(post);
  this.isLoading = false;
}

}
