import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { faImages, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post-form',
  styleUrls: ['./create-post.component.scss'],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  @Output()
  postCreated: EventEmitter<Post> = new EventEmitter();
  form: FormGroup;
  title: string;
  body: string;
  tags: string;
  category: string;
  image: File;

  faTimesCircle = faTimesCircle;
  faImages = faImages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: this.title,
      body: this.body,
      tags: this.tags,
      category: this.category,
      file: this.image,
    });
  }

  save() {
    console.log(this.form.value)
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
