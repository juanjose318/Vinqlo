import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-user-header',
  templateUrl: 'user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})

export class UserHeaderComponent {
  constructor(public dialog: MatDialog) {}

  @Input()
  profileData;

  @Input()
  userId :string;

  @Output()
  userEdited: EventEmitter<any> = new EventEmitter();

  faPen = faPen;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faWhatsapp = faWhatsapp;


  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserProfileComponent, {
      width: '30%',
      id: 'a-create-post-modal',
      data: this.profileData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){
        this.userEdited.emit(result);
      }
    });

  }

}
