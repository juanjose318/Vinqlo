import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/modules/posts/services/posts.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.scss' ]
})

export class FeedComponent implements OnInit {
  constructor( private postsService: PostService) { }

  onPostCreated(event){
    this.postsService.addPost(event);
  }
  ngOnInit() { }
}
