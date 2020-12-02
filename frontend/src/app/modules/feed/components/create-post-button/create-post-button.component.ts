import { Component,  EventEmitter, Output,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'app-create-post-button',
    styleUrls: ['./create-post-button.component.scss'],
    template:`
        <fa-icon class="a-plus-icon" (click)="openDialog()" [icon]="faPlusCircle"></fa-icon>
    `
})

export class CreatePostButtonComponent {
    @Output()
    $post = new EventEmitter;
    faPlusCircle = faPlusCircle;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(
      result =>this.$post.emit(result)
      );
    }
}
