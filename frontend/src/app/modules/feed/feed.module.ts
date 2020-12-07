import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './components/feed/feed.component';

import { FooterComponent } from '../footer/footer.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CreatePostButtonComponent } from './components/create-post-button/create-post-button.component';
import { PostDisplayComponent } from '../posts/components/post-display/post-display.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostListComponent } from '../posts/components/post-list/post-list.component';
import { PostCreateCommentsComponent } from '../posts/components/post-create-comments/post-create-comments.component';
import { PostCommentsComponent } from '../posts/components/post-comments/post-comments.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    FontAwesomeModule,
    FeedRoutingModule,
    MatDividerModule,
    MatExpansionModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FeedComponent
  ],
  declarations: [
    FeedComponent,
    CreatePostComponent,
    PostListComponent,
    PostDisplayComponent,
    CreatePostButtonComponent,
    SearchBarComponent,
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    PostCommentsComponent,
    PostCreateCommentsComponent
  ],
  providers: [],
})
export class FeedModule { }
