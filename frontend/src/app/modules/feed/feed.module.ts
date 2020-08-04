import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';

import { FeedComponent } from './feed/feed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { PostDisplayComponent } from '../posts/post-display/post-display.component';
import { CreatePostButtonComponent } from './create-post-button/create-post-button.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FeedRoutingModule } from './feed-routing.module';
import { HeaderComponent } from '../header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { PostCommentsComponent } from '../posts/post-comments/post-comments.component';
import { PostCreateCommentsComponent } from '../posts/post-create-comments/post-create-comments.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    FormsModule,
    FontAwesomeModule,
    FeedRoutingModule,
    MatDividerModule,
    MatExpansionModule,
    MatMenuModule
  ],
  exports: [
    FeedComponent
  ],
  declarations: [
    FeedComponent,
    CreatePostComponent,
    FeedComponent,
    PostListComponent,
    PostDisplayComponent,
    CreatePostButtonComponent,
    SearchBarComponent,
    FeedComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    PostCommentsComponent,
    PostCreateCommentsComponent
  ],
  providers: [],
})
export class FeedModule { }
