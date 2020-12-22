import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { MaterialModule } from '../materials/material.module';

@NgModule({
  imports: [
    CommonModule,
    FeedRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    FeedComponent,
    HeaderComponent,
    FooterComponent,
    PostDisplayComponent
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
    PostCreateCommentsComponent,
    ],
  providers: [],
})
export class FeedModule { }
