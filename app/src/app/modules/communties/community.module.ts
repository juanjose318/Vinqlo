import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedModule } from '../feed/feed.module';
import { MaterialModule } from '../materials/material.module';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityDisplayComponent } from './components/community display/community-display.component';
import { CommunityFeedComponent } from './components/community-feed/community-feed.component';
import { CommunityListComponent } from './components/community-list/community-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    FeedModule,
    MaterialModule],
  exports: [
    CommunityDisplayComponent
  ],
  declarations: [
    CommunityDisplayComponent,
    CommunityFeedComponent,
    CommunityListComponent],
  providers: [],
})
export class CommunityModule {}
