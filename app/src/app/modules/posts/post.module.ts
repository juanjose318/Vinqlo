import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CommunityModule } from '../communties/community.module';
import { FeedModule } from '../feed/feed.module';
import { PostSingleComponent } from './components/post-single/post-single.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    imports: [
    FeedModule,
    PostRoutingModule,
    CommonModule,
    MatInputModule,
  ],
  exports: [PostSingleComponent],
  declarations: [PostSingleComponent],
  providers: [],
})
export class PostModule {}
