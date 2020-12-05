import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Post } from '../../models/post.interface';
import { PostService } from '../../services/posts.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit{

@Output()
postDeleted = new EventEmitter();

posts: Post[];

constructor(
  private postsService: PostService,
  private router: Router,
  private route: ActivatedRoute, ) {}

ngOnInit() {
  this.postsService.getPosts().subscribe(( data: Post[] ) => {
    this.posts = data;
  });
}

onPostDeleted(post) {
  this.postDeleted.emit(post);
}

}
