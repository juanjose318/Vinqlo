import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
    constructor(public dialog: MatDialog) {}
    faPlusCircle = faPlusCircle;

    openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '30%',
    });

    /**
    dialogRef.afterClosed().subscribe(
        console.log('The dialog was closed');
    );
    */

    }
}
