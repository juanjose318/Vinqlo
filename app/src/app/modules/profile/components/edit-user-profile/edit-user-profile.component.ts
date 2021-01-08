import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faImages, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FileCheck } from 'angular-file-validator';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  form: FormGroup;
  id: string;
  degree: string;
  campus: string;
  bio: string;
  twitter: string;
  instagram: string;
  facebook: string;
  phoneNumber: string;
  image: string;
  imagePreview: string | ArrayBuffer;

  faTimesCircle = faTimesCircle;
  faImages = faImages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: new FormControl(this.id),
      degree: new FormControl(this.degree, [
        Validators.required,
        Validators.minLength(2),
      ]),
      campus: new FormControl(this.campus, [
        Validators.required,
        Validators.minLength(4),
      ]),
      bio: new FormControl(this.bio, [Validators.minLength(4)]),
      instagram: new FormControl(this.instagram, [Validators.minLength(4)]),
      twitter: new FormControl(this.twitter, [Validators.minLength(4)]),
      facebook: new FormControl(this.facebook, [Validators.minLength(4)]),
      phoneNumber: new FormControl(this.phoneNumber, [Validators.minLength(4)]),
      file: new FormControl(this.image, {
        asyncValidators: [
          FileCheck.ngFileValidator(['png', 'jpeg', 'gif', 'jpeg']),
        ],
      }),
    });

    if (!!this.data) {
      console.log(this.data);
      this.form.patchValue({
        id: this.data._id,
        degree: this.data.degree,
        campus: this.data.campus,
        instagram: this.data.socialMedia?.instagram,
        bio: this.data.bio,
        facebook: this.data.socialMedia?.facebook,
        twitter: this.data.socialMedia?.twitter,
        phoneNumber: this.data.socialMedia?.phoneNumber,
        file: this.data.file,
      });
    }
  }

  onFileUploaded(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: image });
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  save() {
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
