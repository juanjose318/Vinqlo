import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'selector-name',
  templateUrl: 'post-single.component.html',
  styleUrls: ['./post-single.component.scss'],
})
export class PostSingleComponent implements OnInit {
  post: Post;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(switchMap((data) => this.postService.getSinglePost(data)))
      .subscribe((data) => (this.post = data.post));
  }


  /**
   *
   * Set Timeout to refresh page and not interrupt the http call
   * Files changed kept in backend, specify in GPDR
   */
  handleUpdate(updatedPost) {
    if (!!updatedPost) {
      this.postService.updatePost(updatedPost);
      this.post = updatedPost;
      setTimeout( this.refresh , 200);
    }
  }

  refresh()
  {
    window.location.reload();
  }

  handleDelete(postToDelete) {
    this.postService.deletePost(postToDelete);
    this.location.back();
  }

  goBack() {
    this.router.navigate(['/feed']);
  }
}
