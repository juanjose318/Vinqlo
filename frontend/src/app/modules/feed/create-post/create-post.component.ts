import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimesCircle, faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post-form',
  styleUrls: ['./create-post.component.scss'],
  templateUrl: './create-post.component.html'
})

export class CreatePostComponent {
  constructor(
  public dialogRef: MatDialogRef<CreatePostComponent>
  ){}
  faTimesCircle = faTimesCircle;
  faImages = faImages;

  closeDialog(): void {

    this.dialogRef.close();
  }
}
