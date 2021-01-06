import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedModule } from '../feed/feed.module';
import { MaterialModule } from '../materials/material.module';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FeedModule
  ],
  exports: [],
  declarations: [
    UserProfileComponent,
    UserHeaderComponent,
    EditUserProfileComponent
  ],
  providers: [],
})
export class ProfileModule { }
