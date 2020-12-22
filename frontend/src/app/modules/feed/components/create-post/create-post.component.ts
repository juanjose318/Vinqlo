import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Post } from 'src/app/modules/posts/models/post.interface';
import { faImages, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FileCheck } from 'angular-file-validator';

@Component({
  selector: 'app-create-post-form',
  styleUrls: ['./create-post.component.scss'],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  @Output()
  postCreated: EventEmitter<Post> = new EventEmitter();

  form: FormGroup;
  id: string;
  title: string;
  body: string;
  tags: string;
  createdAt: Date = new Date();
  category: string;
  image: string;
  imagePreview: string | ArrayBuffer;

  faTimesCircle = faTimesCircle;
  faImages = faImages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      _id: new FormControl(this.id),
      title: new FormControl(this.title, [
        Validators.required,
        Validators.minLength(4),
      ]),
      body: new FormControl(this.body, [
        Validators.required,
        Validators.minLength(4),
      ]),
      tags: new FormControl(this.tags, [Validators.minLength(2)]),
      category: new FormControl(this.category, [Validators.required]),
      file: new FormControl(this.image,{ asyncValidators: [FileCheck.ngFileValidator(['png', 'jpeg','gif','jpeg'])]}),
      createdAt: new FormControl(this.createdAt),
    });

    /**
     * Set data from post to edit if sending data to component
     */
    if (!!this.data) {
      this.form.patchValue({
        _id: this.data.post._id,
        title: this.data.post.title,
        category: this.data.post.category,
        body: this.data.post.body,
        tags: this.data.post.tags,
        file: this.data.post.file,
      });
    }
  }

  /**
   * Validator for image upload
   */
  onFileUploaded(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: image });
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(image);
  }

  save() {
    if(this.form.invalid){
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
