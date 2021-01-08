import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  @Input()
  posts: Post;

  @Input()
  userId: string;

  @Output()
  postDeleted: EventEmitter<any> = new EventEmitter();

  @Output()
  postEdited: EventEmitter<any> = new EventEmitter();

  @Output()
  postViewed: EventEmitter<any> = new EventEmitter();

  @Output()
  postAddedToCollection: EventEmitter<any> = new EventEmitter();

  @Output()
  creatorViewed: EventEmitter<any> = new EventEmitter();

  isLoading: boolean;

  isEmpty: boolean = true;

  constructor() {}

  onPostDeleted(postId) {
    this.isLoading = true;
    this.postDeleted.emit(postId);
    this.isLoading = false;
  }

  onPostViewed(postId) {
    this.postViewed.emit(postId);
  }

  onPostEdited(post: Post) {
    this.isLoading = true;
    this.postEdited.emit(post);
    this.isLoading = false;
  }

  onPostAddedToCollection(postId) {
    this.postAddedToCollection.emit(postId);
  }

  onCreatorViewed(userId){
      this.creatorViewed.emit(userId);
  }

}
