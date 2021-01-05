import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent {

@Input()
posts: Post;

@Input()
userId: string;

@Output()
postDeleted = new EventEmitter();

@Output()
postEdited = new EventEmitter();

@Output()
postLiked = new EventEmitter();

@Output()
postAddedToCollection = new EventEmitter();

isLoading: boolean;

isEmpty: boolean = true;

constructor() {}

onPostDeleted(postId) {
  this.isLoading = true;
  this.postDeleted.emit(postId);
  this.isLoading = false;
}

onPostEdited(post: Post) {
  this.isLoading = true;
  this.postEdited.emit(post);
  this.isLoading = false;
}

onPostLiked(postId) {
  this.postLiked.emit(postId);
}

onPostAddedToCollection(postId){
  this.postAddedToCollection.emit(postId);
}

onCommentCreated(event: Event) {

}


}
