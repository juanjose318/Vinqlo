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
import { PostService } from 'src/app/modules/posts/services/posts.service';
import { Community } from 'src/app/modules/communties/models/community.interface';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, takeUntil, tap } from 'rxjs/operators';
import { CommunityService } from 'src/app/modules/communties/community.service';

@Component({
  selector: 'app-create-post-form',
  styleUrls: ['./create-post.component.scss'],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  @Output()
  postCreated: EventEmitter<Post> = new EventEmitter();

  communitiesList: Community[];
  searching = false;
  filteredCommunities: ReplaySubject<Community[]> = new ReplaySubject<Community[]>(1);

  form: FormGroup;
  id: string;
  community: string;
  title: string;
  body: string;
  tags: string;
  createdAt: Date = new Date();
  image: string;
  imagePreview: string | ArrayBuffer;

  protected _onDestroy = new Subject<void>();


  faTimesCircle = faTimesCircle;
  faImages = faImages;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostComponent>,
    private postService: PostService,
    private communityService: CommunityService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    //this.communitiesList  =
    this.form = this.fb.group({
      id: new FormControl(this.id),
      title: new FormControl(this.title, [
        Validators.required,
        Validators.minLength(4),
      ]),
      body: new FormControl(this.body, [
        Validators.required,
        Validators.minLength(4),
      ]),
      tags: new FormControl(this.tags, [Validators.minLength(2)]),
      communitySearch : new FormControl('',[Validators.required]),
      community: new FormControl(this.community, [Validators.required]),
      file: new FormControl(this.image, {
        asyncValidators: [
          FileCheck.ngFileValidator(['png', 'jpeg', 'gif', 'jpeg']),
        ],
      }),
      createdAt: new FormControl(this.createdAt),
    });

    this.form.get('communitySearch').valueChanges
    .pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      takeUntil((this._onDestroy)),
      debounceTime(200),
      map(search => {
        if (!this.communitiesList) {
          return [];
        }

        return this.communitiesList.filter(community => community.title.indexOf(search) > -1);

      }), delay(500),
      takeUntil(this._onDestroy)
    ).subscribe(filteredCommunities => {
      this.searching = false;
      this.filteredCommunities.next(filteredCommunities);

    },
    error => {
      this.searching = false;

    });

    /**
     * Set data from post to edit if sending data to component
     */
    if (!!this.data) {
      this.form.patchValue({
        id: this.data.post._id,
        title: this.data.post.title,
        community: this.data.post.community,
        body: this.data.post.body,
        tags: this.data.post.tags,
        file: this.data.post.file,
      });
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
