import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostService } from '../../services/posts.service';

@Component({
  selector: 'app-create-post-comments',
  templateUrl: 'post-create-comments.component.html',
  styleUrls: ['post-create-comments.component.scss'],
})
export class PostCreateCommentsComponent implements OnInit {
  @Output()
  commentCreated = new EventEmitter<any>();

  @Input()
  post;

  form: FormGroup;
  body: string;
  id: string;
  createdAt: Date = new Date();
  basePostId : string;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.id),
      post: new FormControl(this.basePostId),
      body: new FormControl(this.body, [
        Validators.required,
        Validators.minLength(2),
      ]),
      createdAt: new FormControl(this.createdAt),
    });

    this.form.patchValue({
      post: this.post._id,
    })
  }

  createComment() {
    if (this.form.invalid) {
      return;
    }
    this.commentCreated.emit(this.form.value);
  }
}
