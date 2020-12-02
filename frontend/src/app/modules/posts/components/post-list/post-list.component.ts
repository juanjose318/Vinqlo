import { Component, OnInit, Input } from '@angular/core';
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

posts: Post[];

constructor(
  private postsService: PostService,
  private router: Router,
  private route: ActivatedRoute, ) {}

ngOnInit() {
  this.postsService.getPosts().subscribe(( data: Post[] ) => {
    this.posts = data;
    console.log(this.posts);
  });
}

}
