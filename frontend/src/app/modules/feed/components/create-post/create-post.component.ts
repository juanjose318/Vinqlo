import { Component,  OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimesCircle, faImages } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-post-form',
  styleUrls: ['./create-post.component.scss'],
  templateUrl: './create-post.component.html'
})

export class CreatePostComponent implements OnInit {
  form: FormGroup;
  body:string;
  tags:string;
  category:string;
  image:File;

  faTimesCircle = faTimesCircle;
  faImages = faImages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostComponent>)
    {}

    ngOnInit(){
      this.form = this.fb.group ({
        body: this.body,
        tags: this.tags,
        category:this.category,
        image: this.image
      })
    }

    save() {
      this.dialogRef.close(this.form.value);
    }

    close() {
      this.dialogRef.close();
    }
  }

