import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedModule } from '../feed/feed.module';
import { MaterialModule } from '../materials/material.module';
import { PostModule } from '../posts/post.module';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityDisplayComponent } from './components/community display/community-display.component';
import { CommunityDescriptionBarComponent } from './components/community-description-bar/description-bar.component';
import { CommunityFeedComponent } from './components/community-feed/community-feed.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CommunitySingleComponent } from './components/community-single/community-single.component';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    FeedModule,
    PostModule,
    MaterialModule],
  exports: [
    CommunityDisplayComponent,
    CommunityDescriptionBarComponent
  ],
  declarations: [
    CommunityDisplayComponent,
    CommunityFeedComponent,
    CommunityListComponent,
    CommunityDescriptionBarComponent,
    CommunitySingleComponent],
  providers: [],
})
export class CommunityModule {}
