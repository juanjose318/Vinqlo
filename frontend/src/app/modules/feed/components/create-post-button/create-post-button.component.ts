import { Component,  EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/modules/posts/models/post.interface';

@Component({
    selector: 'app-create-post-button',
    styleUrls: ['./create-post-button.component.scss'],
    template: `
      <div class="m-bar">
          <fa-icon class="a-plus-icon" (click)="openDialog()" [icon]="faPlusCircle"></fa-icon>
          <span class="a-span">Create Post</span>
      </div>
      `
  })

export class CreatePostButtonComponent {
    @Output()
    postCreated: EventEmitter<Post> = new EventEmitter();
    faPlusCircle = faPlusCircle;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '30%',
      id: 'a-create-post-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.postCreated.emit(result);
      }
    });
    }
}
